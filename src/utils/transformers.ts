import { FormSubmission } from '../types/types';

// 👤 Split full name into firstName and lastName
export function splitName(fullName: string) {
  const parts = fullName.trim().split(' ');
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ') || '',
  };
}

// 🎂 Format date to MM/DD/YYYY
export function formatDOBtoMMDDYYYY(dateStr: string) {
  const date = new Date(dateStr);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// 🧾 Convert incomeRange to number
export function incomeToNumber(range: FormSubmission['incomeRange']) {
  const map: Record<string, number> = {
    '$0-$25k': 0,
    '$25k-$50k': 25000,
    '$50k-$75k': 50000,
    '$75k-$100k': 75000,
    '$100k+': 100000,
  };
  return map[range];
}

// 👨‍💼 EmploymentStatus codes
export function employmentToCode(status: FormSubmission['employmentStatus']) {
  const map: Record<string, string> = {
    'Employed': 'FT',
    'Self-employed': 'SE',
    'Unemployed': 'UE',
    'Retired': 'RT',
    'Student': 'ST',
  };
  return map[status];
}

// 🔢 Priority level to numeric
export function priorityToNumber(priority: FormSubmission['priorityLevel']) {
  const map: Record<string, number> = {
    'Low': 1,
    'Medium': 2,
    'High': 3,
    'Urgent': 4,
  };
  return map[priority];
}

// ✅ Convert boolean to "true"/"false"
export function booleanToString(bool: boolean): string {
  return bool ? 'true' : 'false';
}


export function documentTypeToCode(type: string): string {
  const map: Record<string, string> = {
    Application: 'A',
    Verification: 'V',
    Statement: 'S',
    Contract: 'C',
  };

  return map[type] || type; // fallback to original if not matched
}

export function contactMethodToCode(method: string): string {
  const map: Record<string, string> = {
    Email: 'E',
    Phone: 'P',
    Mail: 'M',
    SMS: 'S',
  };

  return map[method] || method;
}

