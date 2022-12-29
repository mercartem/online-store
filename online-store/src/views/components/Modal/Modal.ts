import { Screen, PaymentSystem } from '../../../constans/types/interfaces';

export class Modal implements Screen {
  closeModal() {
    const modal = document.querySelector('.modal') as HTMLDivElement;
    modal.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  clickInputsCardData() {
    const inputCards = document.querySelectorAll('.card__input') as NodeListOf<HTMLInputElement>;
    const inputsClassCards = document.querySelectorAll('.input-form') as NodeListOf<HTMLDivElement>;

    for (let i = 0; i < inputCards.length; i++) {
      inputCards[i].addEventListener('click', () => {
        for (let j = 0; j < inputCards.length; j++) {
          if (!inputCards[j].value) {
            inputsClassCards[j].classList.remove('input-form-focus');
          }
        }

        inputsClassCards[i].classList.add('input-form-focus');
      });
    }
  }

  validateName(inName: string, section: HTMLDivElement) {
    const reName: RegExp = /^\b[A-Za-z]{3,}\b(?: \b[A-Za-z]{3,}\b){1,}$/;

    if (reName.test(inName)) {
      section.classList.remove('error');
      return true;
    }

    section.classList.add('error');
    return false;
  }

  validatePhone(inPhone: string, section: HTMLDivElement) {
    const rePhone: RegExp = /^\+\d{9,}$/;

    if (rePhone.test(inPhone)) {
      section.classList.remove('error');
      return true;
    }

    section.classList.add('error');
    return false;
  }

  validateAddress(inAddress: string, section: HTMLDivElement) {
    const reAddress: RegExp = /^\b[\w ]{5,}\b(?: \b[\w ]{5,}\b){2,}$/;

    if (reAddress.test(inAddress)) {
      section.classList.remove('error');
      return true;
    }

    section.classList.add('error');
    return false;
  }

  validateEmail(inEmail: string, section: HTMLDivElement) {
    const reEmail: RegExp = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    if (reEmail.test(inEmail)) {
      section.classList.remove('error');
      return true;
    }

    section.classList.add('error');
    return false;
  }

  maskCard(value: string, limit: number, separator: string) {
    let result: string[] = [];

    for (let i = 0; i < value.length; i++) {
      if (i !== 0 && i % limit === 0) {
        result.push(separator);
      }

      result.push(value[i]);
    }

    return result.join('');
  }

  payCard(cardNumber: string) {
    let paymentSystemType: string = '';
    const ccCardTypePatterns: PaymentSystem<RegExp> = {
      mir: /^2/,
      visa: /^4/,
      mastercard: /^5/,
    };

    Object.keys(ccCardTypePatterns).forEach((key) => {
      if (ccCardTypePatterns[key].test(cardNumber)) {
        paymentSystemType = key;
      }
    });

    const activePaymentSystem = document.querySelector('.card__logo') as HTMLDivElement;
    Object.keys(ccCardTypePatterns).forEach((key) => {
      activePaymentSystem.classList.remove(`card__${key}`);
    });

    if (paymentSystemType) {
      activePaymentSystem.classList.add(`card__${paymentSystemType}`);
    }
  }

  validateCardNumber(inputCardNumber: HTMLInputElement, inCardNumber: string, section: HTMLDivElement) {
    const reCardNumber: RegExp = /^\d{0,16}$/g;
    const separatorCardNumber: string = ' ';
    inCardNumber = inCardNumber.replace(/[^\d]/g, '');

    if (reCardNumber.test(inCardNumber)) {
      inCardNumber = this.maskCard(inCardNumber, 4, separatorCardNumber);
      inputCardNumber.value = inCardNumber !== '' ? inCardNumber : '';
    }

    // Добавление картинки платёжной системы
    this.payCard(inputCardNumber.value);

    inCardNumber = inCardNumber.replace(/[^\d]/g, '');
    if (/^\d{16}$/g.test(inCardNumber)) {
      section.classList.remove('error');
      return true;
    }

    section.classList.add('error');
    return false;
  }

  validateCardMonth(inputCardMonth: HTMLInputElement, inCardMonth: string, section: HTMLDivElement) {
    const reCardMonth: RegExp = /^\d{4}$/;
    const separatorCardMonth: string = '/';
    inCardMonth = inCardMonth.replace(/[^\d]/g, '');

    if (reCardMonth.test(inCardMonth)) {
      const month: string = inCardMonth.substring(0, 2);
      inCardMonth = this.maskCard(inCardMonth, 2, separatorCardMonth);
      inputCardMonth.value = inCardMonth;

      if (Number(month) > 12 || Number(month) === 0) {
        section.classList.add('error');
        return false;
      }

      section.classList.remove('error');
      return true;
    }

    inCardMonth = this.maskCard(inCardMonth, 2, separatorCardMonth);
    inputCardMonth.value = inCardMonth;
    section.classList.add('error');
    return false;
  }

  validateCardCVV(inputCardCVV: HTMLInputElement, inCardCVV: string, section: HTMLDivElement) {
    const reCardCVV: RegExp = /^\d{3}$/;
    inCardCVV = inCardCVV.replace(/[^\d]/g, '');
    inputCardCVV.value = inCardCVV;

    if (reCardCVV.test(inCardCVV)) {
      section.classList.remove('error');
      return true;
    }

    section.classList.add('error');
    return false;
  }

  afterRender() {
    const section__input = document.querySelectorAll('.form-input') as NodeListOf<HTMLDivElement>;

    // Обработка события кнопки (крестик) закрытия модального окна
    const buttonClose = document.querySelector('.modal__btn') as HTMLButtonElement;
    buttonClose.addEventListener('click', () => {
      this.closeModal();
    });

    // Анимация при клике на поле в Card Data
    this.clickInputsCardData();

    // Проверка валидации поля "Имя и Фамилия"
    const inputName = document.querySelector('#name') as HTMLInputElement;
    inputName.addEventListener('input', () => {
      this.validateName(inputName.value, section__input[0]);
    });

    // Проверка валидации поля "Телефон"
    const inputPhone = document.querySelector('#phone') as HTMLInputElement;
    inputPhone.addEventListener('input', () => {
      if (!/^\+\d*$/.test(inputPhone.value)) {
        inputPhone.value = '+' + inputPhone.value.slice(1);
      }
      this.validatePhone(inputPhone.value, section__input[1]);
    });

    // Добавление к полю "Телефон" символ "+" при фокусировании
    inputPhone.addEventListener('focus', () => {
      if (!/^\+\d*$/.test(inputPhone.value)) {
        inputPhone.value = '+' + inputPhone.value.slice(1);
      }
    });

    // Ввод только цифр для поля "Телефон"
    inputPhone.addEventListener('keypress', (e) => {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });

    // Проверка валидации поля "Адрес"
    const inputAddress = document.querySelector('#address') as HTMLInputElement;
    inputAddress.addEventListener('input', () => {
      this.validateAddress(inputAddress.value, section__input[2]);
    });

    // Проверка валидации поля "Email"
    const inputEmail = document.querySelector('#email') as HTMLInputElement;
    inputEmail.addEventListener('input', () => {
      this.validateEmail(inputEmail.value, section__input[3]);
    });

    // Проверка валидации поля "Номер карты"
    const inputCardNumber = document.querySelector('#card-number') as HTMLInputElement;
    inputCardNumber.addEventListener('input', () => {
      this.validateCardNumber(inputCardNumber, inputCardNumber.value, section__input[4]);
    });

    // Проверка валидации поля "MM / YY"
    const inputCardMonth = document.querySelector('#card-month') as HTMLInputElement;
    inputCardMonth.addEventListener('input', () => {
      this.validateCardMonth(inputCardMonth, inputCardMonth.value, section__input[5]);
    });

    // Проверка валидации поля "CVV"
    const inputCardCVV = document.querySelector('#card-cvv') as HTMLInputElement;
    inputCardCVV.addEventListener('input', () => {
      this.validateCardCVV(inputCardCVV, inputCardCVV.value, section__input[6]);
    });

    // Проверка всей полей при submit
    const modalContainer = document.querySelector('.modal__container') as HTMLDivElement;
    const form = document.getElementById('payment-form') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (
        this.validateName(inputName.value, section__input[0]) &&
        this.validatePhone(inputPhone.value, section__input[1]) &&
        this.validateAddress(inputAddress.value, section__input[2]) &&
        this.validateEmail(inputEmail.value, section__input[3]) &&
        this.validateCardNumber(inputCardNumber, inputCardNumber.value, section__input[4]) &&
        this.validateCardMonth(inputCardMonth, inputCardMonth.value, section__input[5]) &&
        this.validateCardCVV(inputCardCVV, inputCardCVV.value, section__input[6])
      ) {
        modalContainer.innerHTML = '';
        modalContainer.innerHTML = `
        <div class="modal__content-success">
          <h2 class="font_M">The order has been successfully placed!</h2>
        </div>`;

        localStorage.clear();

        setTimeout(() => {
          document.location.hash = `/`;
          form.submit();
        }, 3000);
      } else {
        for (let i = 0; i < section__input.length; i++) {
          section__input[i].classList.add('error');
        }

        return;
      }
    });
  }

  render() {
    return `
    <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__container">
          <div class="modal__wrapper">
            <div class="modal__content">
              <form id="payment-form" class="modal__body">
                <div class="modal__sections">
                  <div class="modal__section section-form">
                    <div class="section-form__header">
                      <h2 class="font_M">Making an order</h2>
                    </div>
                    <button class="modal__btn">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z" />
                      </svg>
                    </button>
                  </div>
                  <div class="modal__section section-form">
                    <div class="section-form__header">
                      <h2 class="font_M">Data</h2>
                    </div>
                    <div class="section-form__content">
                      <div class="section-form__input form-input">
                        <label class="section-form__label font_S">
                          <input class="field" placeholder="Your name and surname"  id="name" type="text" autocomplete="off">
                        </label>
                        <div class="validate-message">Enter the full name and surname (at least 2 words and at least 3 words each)</div>
                      </div>
                      <div class="section-form__input form-input">
                        <label class="section-form__label font_S">
                          <input class="field" placeholder="Phone number" autocomplete="off" id="phone" type="text"
                           inputmode="tel" minlength="9" >
                        </label>
                        <div class="validate-message">Enter the phone number in full (at least 9 digits)</div>
                      </div>
                      <div class="section-form__input form-input">
                        <label class="section-form__label font_S">
                          <input class="field" placeholder="Delivery address"  id="address" type="text"
                            autocomplete="off">
                        </label>
                        <div class="validate-message">Enter the address in full (at least 3 words and the length of each at least 5)</div>
                      </div>
                      <div class="section-form__input form-input">
                        <label class="section-form__label font_S">
                          <input class="field" placeholder="E-mail"  id="email" type="email" inputmode="email"
                            autocomplete="off">
                        </label>
                        <div class="validate-message">Enter the email in full</div>
                      </div>
                    </div>
                  </div>
                  <div class="modal__section section-form">
                    <div class="section-form__header">
                      <h2 class="font_M">Card data</h2>
                    </div>
                    <div class="section-form__content card">
                      <div class="card__content">
                        <div class="card__number input-form form-input">
                          <label class="card__label font_S">Card number</label>
                          <div class="card__number__content input-form__card font_S">
                            <input class="field card__input" id="card-number" type="text" inputmode="numeric"
                               maxlength="19" >
                            <div class="card__logo">
                            </div>
                          </div>
                          <div class="validate-message__card">Enter the card number in full (must be 16 digits)</div>
                        </div>
                        <div class="card__month input-form form-input">
                          <label class="card__label font_S">MM / YY</label>
                          <div class="card__month-input input-form__card font_S">
                            <input class="field card__input" id="card-month" type="text" inputmode="numeric"
                               maxlength="5" >
                          </div>
                          <div class="validate-message__card">Enter MM/YY in full (0 < MM < 12)</div>
                        </div>
                        <div class="card__cvv input-form form-input">
                          <label class="card__label font_S">CVV</label>
                          <div class="card__cvv-input input-form__card font_S">
                            <input class="field card__input" id="card-cvv" type="text" inputmode="numeric"
                               maxlength="3" >
                          </div>
                          <div class="validate-message__card">Enter the CVV in full</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" id="payment-submit" form="payment-form"
                    class="form-modal__btn btn btn_primary btn_L">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

const modal = new Modal();
export default modal;
