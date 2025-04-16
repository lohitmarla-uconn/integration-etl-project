import { CustomerConfig } from '../types/types';
import * as transformers from '../utils/transformers';
import * as validators from '../utils/validators';

const customerAConfig: CustomerConfig = {
  customerID: 'CUST12345',
  endpoints: [
    {
      endpointName: 'CustomerProfileAPI',
      path: '/customer/profile',
      fields: [
        { fieldName: 'personalName', required: true },
        {
          fieldName: 'dateOfBirth',
          required: true,
          transformFn: transformers.formatDOBtoMMDDYYYY,
        },
        { fieldName: 'customerID', required: true },
        { fieldName: 'emailAddress' },
        { fieldName: 'phoneNumber' },
      ],
    },
    {
      endpointName: 'CreditCheckSystem',
      path: '/credit/check',
      fields: [
        { fieldName: 'customerID', required: true },
        {
          fieldName: 'incomeRange',
          required: true,
          transformFn: transformers.incomeToNumber,
        },
        { fieldName: 'creditScore' },
      ],
    },
    {
      endpointName: 'DocumentStorageService',
      path: '/document/storage',
      fields: [
        { fieldName: 'customerID' },
        {
          fieldName: 'documentType',
          transformFn: transformers.documentTypeToCode,
          validateFn: validators.isValidDocumentType,
        },
        { fieldName: 'documentID' },
      ],
    },
  ],
};

const customerBConfig: CustomerConfig = {
  customerID: 'CUST99999',
  endpoints: [
    {
      endpointName: 'CommunicationPreferencesAPI',
      path: '/communication/preferences',
      fields: [
        { fieldName: 'customerID', required: true },
        {
          fieldName: 'preferredContactMethod',
          transformFn: transformers.contactMethodToCode,
          validateFn: validators.isValidContactMethod,
        },
        { fieldName: 'emailAddress' },
        { fieldName: 'phoneNumber' },
        {
          fieldName: 'marketingOptIn',
          transformFn: (v) => (v ? 'Y' : 'N'),
        },
      ],
    },
    {
      endpointName: 'ConsentManagementService',
      path: '/consent/manage',
      fields: [
        { fieldName: 'customerID' },
        {
          fieldName: 'consentGiven',
          transformFn: (v) => v.toString(),
        },
        { fieldName: 'lastUpdated' },
      ],
    },
  ],
};

const CUSTOMER_CONFIGS: Record<string, CustomerConfig> = {
  CUST12345: customerAConfig,
  CUST99999: customerBConfig,
};

export { customerAConfig, customerBConfig, CUSTOMER_CONFIGS };