import { Screen } from '../../../constans/types/interfaces';
import { getCartItems } from '../../../constans/localStorage';

export class Header implements Screen {
  render() {
    const cartItems = getCartItems();

    return `
    <div class="header__container container">
    <div class="header__body">
      <div class="header__logo logo">
        <a> VITART </a>
      </div>
      <div class="header__main">
        <nav class="header__menu menu-nav">
          <ul class="menu-nav__list">
            <li class="menu-nav__item">
              <a href="/#/" class="font_white font_XS menu-nav__link">Catalog</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="header__actions actions-header">
        <div class="cart-header">
          <a href="/#/cart" class="actions-header__icon">
            <svg className="icon" width="24" height="24" viewBox="0 0 18 18" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.9993 17.6615C17.9993 17.6239 17.9993 17.6239 17.9993 17.6615V4.17093C17.9993 3.94528 17.8489 3.79485 17.6232 3.79485H14.5422C14.467 1.69094 12.7384 0 10.6345 0C9.95829 0 9.35656 0.150432 8.83076 0.450585C8.30425 0.150432 7.66563 0 7.027 0C4.92238 0 3.19383 1.69094 3.11862 3.79556H0.376079C0.150432 3.79556 0 3.94528 0 4.17093V17.6239C0 17.8496 0.150432 18 0.376079 18H13.641H17.6615C17.6991 18 17.7367 18 17.7744 17.9624H17.812C17.8496 17.9624 17.8872 17.9248 17.8872 17.9248C17.8872 17.9248 17.8872 17.9248 17.9248 17.9248C17.9624 17.8872 17.9624 17.8496 18 17.8496V17.812C17.9993 17.6991 17.9993 17.6615 17.9993 17.6615ZM17.2478 16.4964L15.9699 14.8431V4.5094H17.2478V16.4964ZM13.9788 4.5094H15.2191V14.8431L13.9788 16.4964V4.5094ZM10.6345 0.713841C12.3255 0.713841 13.7155 2.06631 13.7908 3.75795H13.6403H10.9347C10.8971 2.63043 10.3713 1.61572 9.58221 0.90188C9.88308 0.789057 10.2208 0.713841 10.6345 0.713841ZM8.79316 1.27796C9.58221 1.84137 10.108 2.74325 10.1456 3.75795H7.47759C7.47759 2.74325 8.0041 1.84137 8.79316 1.27796ZM6.9894 0.713841C7.36547 0.713841 7.74084 0.789057 8.07932 0.90188C7.29026 1.61572 6.76446 2.63043 6.72685 3.75795H3.83317C3.87078 2.06702 5.26085 0.713841 6.9894 0.713841ZM0.713841 4.5094H3.0434V6.27555C3.0434 6.5012 3.19383 6.65163 3.41948 6.65163C3.64513 6.65163 3.79556 6.5012 3.79556 6.27555V4.5094H10.1087V6.27555C10.1087 6.5012 10.2592 6.65163 10.4848 6.65163C10.7105 6.65163 10.8609 6.5012 10.8609 6.27555V4.5094H13.1904V17.2478H0.713841V4.5094ZM14.3542 17.2478L15.5945 15.5945L16.8349 17.2478H14.3542V17.2478Z"
                fill="white" />
            </svg>
            <div class="cart-header__count">
              <span class="font_XSS font_white">${cartItems.reduce((a, c) => a + c.qty, 0)}</span>
            </div>
          </a>
        </div>
        <div class="actions-header__sum">
          <span class="font_XSS font_white">${cartItems.reduce((a, c) => a + c.price * c.qty, 0)} ₽</span>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

const header = new Header();
export default header;
