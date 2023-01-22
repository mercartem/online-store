import modal from '../views/components/Modal/Modal';

describe('validateName', () => {
  it('valid name true', () => {
    const inName = 'Vitaliy Sobolevskiy';
    const section = document.createElement('div');
    const result = modal.validateName(inName, section);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid name false', () => {
    const inName = 'Vitaliy';
    const section = document.createElement('div');
    const result = modal.validateName(inName, section);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});

describe('validatePhone', () => {
  it('valid phone numbers true', () => {
    const inPhone = '+123456789';
    const section = document.createElement('div');
    const result = modal.validatePhone(inPhone, section);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid phone nubmer false', () => {
    const inPhone = '+12345678';
    const section = document.createElement('div');
    const result = modal.validatePhone(inPhone, section);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});

describe('validateAddress', () => {
  it('valid addresses true', () => {
    const inAddress = 'Russia Novosibirsk Lenina';
    const section = document.createElement('div');
    const result = modal.validateAddress(inAddress, section);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid addresses false', () => {
    const inAddress = 'moscow';
    const section = document.createElement('div');
    const result = modal.validateAddress(inAddress, section);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});

describe('validateEmail', () => {
  it('valid email true', () => {
    const inEmail = 'test@example.com';
    const section = document.createElement('div');
    const result = modal.validateEmail(inEmail, section);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid email false', () => {
    const inEmail = 'test@';
    const section = document.createElement('div');
    const result = modal.validateEmail(inEmail, section);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});

describe('validateCardNumber', () => {
  it('valid card numbers true', () => {
    const activePaymentSystem = document.createElement('div');
    const inputCardNumber = document.createElement('input');
    const inCardNumber = '2222 2222 2222 2222';
    const section = document.createElement('div');
    const result = modal.validateCardNumber(inputCardNumber, inCardNumber, section, activePaymentSystem);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid card numbers false', () => {
    const inputCardNumber = document.createElement('input');
    const activePaymentSystem = document.createElement('div');
    const inCardNumber = '2222 2222 222';
    const section = document.createElement('div');
    const result = modal.validateCardNumber(inputCardNumber, inCardNumber, section, activePaymentSystem);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});

describe('validateCardMonth', () => {
  it('valid card MM/YY true', () => {
    const inputCardMonth = document.createElement('input');
    const inCardMonth = '1224';
    const section = document.createElement('div');
    const result = modal.validateCardMonth(inputCardMonth, inCardMonth, section);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid card MM/YY false', () => {
    const inputCardMonth = document.createElement('input');
    const inCardMonth = '1324';
    const section = document.createElement('div');
    const result = modal.validateCardMonth(inputCardMonth, inCardMonth, section);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});

describe('validateCardCVV', () => {
  it('valid card CVV true', () => {
    const inputCardCVV = document.createElement('input');
    const inCardCVV = '333';
    const section = document.createElement('div');
    const result = modal.validateCardCVV(inputCardCVV, inCardCVV, section);
    expect(result).toBe(true);
    expect(section.classList).not.toContain('input-error');
  });

  it('valid card CVV false', () => {
    const inputCardCVV = document.createElement('input');
    const inCardCVV = '3334';
    const section = document.createElement('div');
    const result = modal.validateCardCVV(inputCardCVV, inCardCVV, section);
    expect(result).toBe(false);
    expect(section.classList).toContain('input-error');
  });
});
