import modal from '../views/components/Modal/Modal';

describe('payCard', () => {
  it('valid card number visa', () => {
    const cardNumber = '4222 2222 2222 2222';
    const activePaymentSystem = document.createElement('div');
    activePaymentSystem.classList.add('card__logo');
    modal.payCard(cardNumber, activePaymentSystem);
    expect(activePaymentSystem.classList).toContain('card__visa');
  });

  it('valid card number mastercard', () => {
    const cardNumber = '5222 2222 2222 2222';
    const activePaymentSystem = document.createElement('div');
    activePaymentSystem.classList.add('card__logo');
    modal.payCard(cardNumber, activePaymentSystem);
    expect(activePaymentSystem.classList).toContain('card__mastercard');
  });

  it('valid card number mir', () => {
    const cardNumber = '2222 2222 2222 2222';
    const activePaymentSystem = document.createElement('div');
    activePaymentSystem.classList.add('card__logo');
    modal.payCard(cardNumber, activePaymentSystem);
    expect(activePaymentSystem.classList).toContain('card__mir');
  });

  it('valid card number not visa,mastercard or mir', () => {
    const cardNumber = '1234';
    const activePaymentSystem = document.createElement('div');
    activePaymentSystem.classList.add('card__logo');
    modal.payCard(cardNumber, activePaymentSystem);
    expect(activePaymentSystem.classList).not.toContain('card__mir');
    expect(activePaymentSystem.classList).not.toContain('card__visa');
    expect(activePaymentSystem.classList).not.toContain('card__mastercard');
  });
});
