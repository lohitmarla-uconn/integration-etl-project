import axios from 'axios';
import { FormSubmission, CustomerConfig } from '../types/types';
import * as transformers from '../utils/transformers';
import * as validators from '../utils/validators';
import { CUSTOMER_CONFIGS } from '../config/customerConfig';
import dotenv from 'dotenv';
import { enrichNotesWithLLM } from './openAIService';

dotenv.config();

const BASE_URL = process.env.WEBHOOK_BASE_URL || 'https://webhook.site/YOUR-REAL-ID';

// 🔁 Retry logic wrapper
export async function postWithRetry(url: string, payload: any, retries = 3, delayMs = 1000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(url, payload);
      console.log(`✅ Posted to ${url} (Attempt ${attempt}): ${response.status}`);
      return;
    } catch (err) {
      const error = err as Error;
      console.warn(`⚠️ Attempt ${attempt} failed for ${url}: ${error.message}`);
      if (attempt === retries) {
        console.error(`❌ All retry attempts failed for ${url}`);
        throw error;
      }
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
}

// 📦 Main ETL function
export async function processSubmission(submission: FormSubmission) {
  const config = CUSTOMER_CONFIGS[submission.customerID];

  if (!config) {
    console.error(`❌ No configuration found for customer ID: ${submission.customerID}`);
    return;
  }

  const requests = config.endpoints.map(async (endpoint) => {
    const payload: Record<string, any> = {};

    for (const rule of endpoint.fields) {
      const rawValue = submission[rule.fieldName as keyof FormSubmission];

      // 1️⃣ Validate raw value first
      if (rule.validateFn && !rule.validateFn(rawValue)) {
        console.error(`❌ Validation failed for "${rule.fieldName}" with value "${rawValue}"`);
        continue;
      }

      // 2️⃣ Then apply transformation
      let value: any;
      try {
        value = rule.transformFn ? rule.transformFn(rawValue) : rawValue;
      } catch {
        console.error(`❌ Error transforming field "${rule.fieldName}" for ${endpoint.endpointName}`);
        continue;
      }

      // 3️⃣ Check for required fields
      if (rule.required && (value === null || value === undefined || value === '')) {
        console.error(`❌ Missing required field "${rule.fieldName}" for ${endpoint.endpointName}`);
        continue;
      }

      // 4️⃣ Handle special cases
      if (rule.fieldName === 'personalName' && endpoint.endpointName === 'CustomerProfileAPI') {
        const { firstName, lastName } = transformers.splitName(String(value));
        payload['firstName'] = firstName;
        payload['lastName'] = lastName;
      } else if (rule.fieldName === 'processingNotes' && endpoint.endpointName === 'ApprovalWorkflowEngine') {
        const enriched = await enrichNotesWithLLM(String(value));
        payload[rule.fieldName] = enriched;
      } else {
        payload[rule.fieldName] = value;
      }
    }

    const url = `${BASE_URL}${endpoint.path}`;
    console.log(`📦 Payload for ${endpoint.endpointName}:`, payload);
    await postWithRetry(url, payload);
  });

  // ⚡ Run all endpoint posts in parallel
  await Promise.allSettled(requests);
  console.log('🎯 All endpoint processing completed.');
}
