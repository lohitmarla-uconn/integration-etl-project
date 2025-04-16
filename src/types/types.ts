
export interface FormSubmission {
    personalName: string;
    customerID: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    currentAddress: string;
    mailingAddress: string;
    employmentStatus: 'Employed' | 'Self-employed' | 'Unemployed' | 'Retired' | 'Student';
    incomeRange: '$0-$25k' | '$25k-$50k' | '$50k-$75k' | '$75k-$100k' | '$100k+';
    creditScore: number;
    productCategory: 'Loans' | 'Insurance' | 'Investments' | 'Banking' | 'Credit Cards';
    requestDate: string;
    priorityLevel: 'Low' | 'Medium' | 'High' | 'Urgent';
    preferredContactMethod: 'Email' | 'Phone' | 'Mail' | 'SMS';
    accountType: 'Personal' | 'Business' | 'Joint' | 'Trust';
    documentType: 'Application' | 'Verification' | 'Statement' | 'Contract';
    documentID: string;
    approvalStatus: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
    processingNotes: string;
    consentGiven: boolean;
    marketingOptIn: boolean;
    lastUpdated: string;
    agentID: string;
    deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'Other';
    ipAddress: string;
  }
  
  // Field-level transformation and validation rule
  export interface FieldTransformRule {
    fieldName: keyof FormSubmission;
    transformFn?: (value: any) => any;
    validateFn?: (value: any) => boolean;
    required?: boolean;
  }
  
  // Configuration for a single endpoint
  export interface EndpointConfig {
    endpointName: string;
    path: string;
    fields: FieldTransformRule[];
  }
  
  // Per-customer configuration
  export interface CustomerConfig {
    customerID: string;
    endpoints: EndpointConfig[];
  }
  