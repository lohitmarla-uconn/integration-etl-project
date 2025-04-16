import { processSubmission } from './services/endpointService';
import { FormSubmission } from './types/types';

const mockSubmission: FormSubmission = {
  personalName: 'Lohit Marla',
  customerID: 'CUST99999',
  emailAddress: 'lohit@example.com',
  phoneNumber: '123-456-7890',
  dateOfBirth: '1996-06-15',
  currentAddress: '123 Main St, Hartford, CT 06103',
  mailingAddress: '123 Main St, Hartford, CT 06103',
  employmentStatus: 'Employed',
  incomeRange: '$50k-$75k',
  creditScore: 700,
  productCategory: 'Loans',
  requestDate: '2024-04-14',
  priorityLevel: 'High',
  preferredContactMethod: 'Email',
  accountType: 'Personal',
  documentType: 'Application',
  documentID: 'DOC123456',
  approvalStatus: 'Pending',
  processingNotes: 'Customer requested fast processing',
  consentGiven: true,
  marketingOptIn: false,
  lastUpdated: '2024-04-14T14:30:00Z',
  agentID: 'AGT001',
  deviceType: 'Desktop',
  ipAddress: '192.168.1.100',
};

processSubmission(mockSubmission)
  .then(() => {
    console.log('🎯 Form submission processed!');
  })
  .catch((err) => {
    console.error('🔥 Error processing submission:', err);
  });
