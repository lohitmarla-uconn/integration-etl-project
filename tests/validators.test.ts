import * as validators from '../src/utils/validators';

describe('Validator Utilities', () => {
  it('validates name with space', () => {
    expect(validators.isValidName('John Doe')).toBe(true);
  });

  it('validates age >= 18', () => {
    expect(validators.isAdult('2000-01-01')).toBe(true);
    expect(validators.isAdult('2010-01-01')).toBe(false);
  });

  it('validates email format', () => {
    expect(validators.isValidEmail('test@example.com')).toBe(true);
  });

  it('validates phone format', () => {
    expect(validators.isValidPhone('123-456-7890')).toBe(true);
  });

  it('validates credit score', () => {
    expect(validators.isValidCreditScore(720)).toBe(true);
    expect(validators.isValidCreditScore(200)).toBe(false);
  });
});
