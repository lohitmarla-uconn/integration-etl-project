import * as transformers from '../src/utils/transformers';

describe('Transformer Utilities', () => {
  it('splits full name correctly', () => {
    const result = transformers.splitName('Lohit Marla');
    expect(result).toEqual({ firstName: 'Lohit', lastName: 'Marla' });
  });

  it('converts incomeRange to number', () => {
    expect(transformers.incomeToNumber('$75k-$100k')).toBe(75000);
  });

  it('formats date to MM/DD/YYYY', () => {
    const formatted = transformers.formatDOBtoMMDDYYYY(new Date(2000, 0, 15).toISOString());
    expect(formatted).toBe('01/15/2000');
  });
  
});
