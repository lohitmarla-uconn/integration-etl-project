// ✅ Check if name contains at least a first and last name

import { FormSubmission } from '../types/types';

export function isValidName(name: string): boolean {
    return typeof name === 'string' && name.trim().includes(' ');
  }
  
  // ✅ Check if date is a valid date and age is at least 18
  export function isAdult(dateStr: string): boolean {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
  
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
  
    return (
      age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    );
  }
  
  // ✅ Basic email validation
  export function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  // ✅ Basic phone validation (US format: xxx-xxx-xxxx)
  export function isValidPhone(phone: string): boolean {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  }
  
  // ✅ Credit score: between 300 and 850
  export function isValidCreditScore(score: number): boolean {
    return typeof score === 'number' && score >= 300 && score <= 850;
  }
  
  // ✅ IP address validation (IPv4)
  export function isValidIP(ip: string): boolean {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
  }
  
  export function isValidDocumentType(type: string): boolean {
    return ['Application', 'Verification', 'Statement', 'Contract'].includes(type);
  }
  
  export function isValidContactMethod(
    method: FormSubmission['preferredContactMethod']
  ): boolean {
    return ['Email', 'Phone', 'Mail', 'SMS'].includes(method);
  }