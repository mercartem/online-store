import { Screen, Route, CartProduct } from '../../../constans/types/interfaces';
import { getCartItems } from '../../../constans/localStorage';
import { parseRequestUrl, rerender } from '../../../constans/utils';
import header from '../../components/Header/header';
import homeScreen from '../Main/HomeScreen';
import modal from '../../components/Modal/Modal';

class CartScreen implements Screen {
  limit: number;
  url: Route;
  page: number;
  promo: number;
  codes: string[];
  appliedPromo: string[];

  constructor() {
    this.url = parseRequestUrl();
    this.limit =
      Number(this.url.queryParams.limit) < getCartItems().length
        ? Number(this.url.queryParams.limit)
        : getCartItems().length;
    this.page =
      Number(this.url.queryParams.page) <= Math.ceil(getCartItems().length / this.limit)
        ? Number(this.url.queryParams.page)
        : 1;
    this.promo = 0;
    this.codes = [];
    this.appliedPromo = [];
  }

  openModal() {
    const section__input = document.querySelectorAll('.form-input') as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < section__input.length; i++) {
      section__input[i].classList.remove('input-error');
    }
    const modal = document.querySelector('.modal') as HTMLDivElement;
    document.body.style.overflow = 'hidden';
    modal.classList.add('modal-open');
  }

  searchPromo(code: string) {
    if (code === 'RS' || code === 'EPM') {
      if (!this.codes.includes(code)) {
        this.codes.push(code);
        rerender(cartScreen);
      }
    }
  }

  applyPromo(i: number) {
    if (this.appliedPromo.includes(this.codes[i])) {
      const index = this.appliedPromo.indexOf(this.codes[i]);
      if (index !== -1) {
        this.appliedPromo.splice(index, 1);
      }

      this.promo += -10;
    } else {
      this.promo += 10;
      this.appliedPromo.push(this.codes[i]);
    }

    rerender(cartScreen);
  }

  itemQty(e: Event) {
    const items = getCartItems();
    const target = e.target as HTMLElement;
    const id = Number(target.id);
    return items.find((x) => x.product === id) as CartProduct;
  }

  addQty(e: Event) {
    const item = this.itemQty(e);
    const qtyCount = item.qty < item.stock ? item.qty + 1 : item.qty;
    homeScreen.addToCart({ ...item, qty: qtyCount }, true);
  }

  removeQty(e: Event) {
    const item = this.itemQty(e);
    const qtyCount = item.qty - 1;
    if (qtyCount < 1) {
      homeScreen.removeFromCart(item.product);
      this.page =
        this.page <= Math.ceil(getCartItems().length / this.limit) || this.page === 1 ? this.page : this.page - 1;
      rerender(cartScreen);
    } else {
      homeScreen.addToCart({ ...item, qty: qtyCount }, true);
    }
  }

  afterRender() {
    const btnPlus = document.querySelectorAll('.plus') as NodeListOf<HTMLElement>;
    const btnMinus = document.querySelectorAll('.minus') as NodeListOf<HTMLElement>;
    const rightArrow = document.querySelector('.right-arrow') as HTMLElement;
    const leftArrow = document.querySelector('.left-arrow') as HTMLElement;
    const selectItems = document.querySelector('.select') as HTMLElement;
    const formOrder = document.querySelector('.order__promo') as HTMLFormElement;
    const inputOrder = document.querySelector('.order__input') as HTMLInputElement;
    const addPromocode = document.querySelectorAll('.add') as NodeListOf<HTMLElement>;
    const buttonEmpty = document.querySelector('.error__btn') as HTMLElement;
    const modalView = document.querySelector('.product-order__one-click') as HTMLButtonElement;

    // Проверяем наличие элемента
    if (buttonEmpty) {
      buttonEmpty.addEventListener('click', () => {
        document.location.hash = `/`;
      });
    } else {
      // Рендерим действия модального окна
      modal.afterRender();

      // Обработка события кнопки перехода к модальному окну
      modalView.addEventListener('click', () => {
        this.openModal();
      });

      // Обработка события формы поиска промокодов
      formOrder.addEventListener('submit', () => {
        const code = inputOrder.value;
        this.searchPromo(code);
      });

      // Обработка события кнопки применения промокодов
      for (let i = 0; i < addPromocode.length; i++) {
        addPromocode[i].addEventListener('click', () => {
          this.applyPromo(i);
        });
      }

      // Обработка событий кнопок переключения страниц
      rightArrow.addEventListener('click', () => {
        this.page < getCartItems().length / this.limit ? this.page++ : this.page;
        document.location.hash = `/cart?limit=${this.limit}&page=${this.page}`;
      });
      leftArrow.addEventListener('click', () => {
        this.page > 1 ? this.page-- : this.page;
        document.location.hash = `/cart?limit=${this.limit}&page=${this.page}`;
      });

      // Обработка событий кнопок смены лимита товаров
      selectItems.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.limit = Number(target.value);
        this.page = this.page <= Math.ceil(getCartItems().length / this.limit) ? this.page : 1;
        document.location.hash = `/cart?limit=${Number(target.value)}`;
      });

      // Обработка событий кнопок изменения кол-ва товаров
      for (let i = 0; i < btnPlus.length; i++) {
        btnPlus[i].addEventListener('click', (e) => {
          this.addQty(e);
        });
        btnMinus[i].addEventListener('click', (e) => {
          this.removeQty(e);
        });
      }
    }
  }
  render() {
    rerender(header);
    const cartItems = getCartItems();

    return cartItems.length < 1
      ? `
      <div class="page__container main__container container">
        <div class="error">
          <div class="error__info">
            <h1 class="error__title font_XXL">Cart is empty...</h1>
            <button class="error__btn btn btn_L btn_primary">Go to catalog</button>
          </div>
        <div>
      </div>`
      : `
    <div class="page__container container shopping__container">
      <div class= "cart">
        <div class="cart__page">
          <h2 class="cart__items font_XS">
            ITEMS: 
            <select class="select">
              ${[...Array(cartItems.length).keys()].map((x) => {
                if (this.limit) {
                  if (this.limit === x + 1) {
                    return `<option selected value="${x + 1}">${x + 1}</option>`;
                  } else {
                    return `<option value="${x + 1}">${x + 1}</option>`;
                  }
                } else {
                  if (cartItems.length === x + 1) {
                    return `<option selected value="${x + 1}">${x + 1}</option>`;
                  } else {
                    return `<option value="${x + 1}">${x + 1}</option>`;
                  }
                }
              })}
            </select>
          </h2>
          <h2 class="cart__pgn font_XS">PAGE:
            <span class="left-arrow"></span>${this.page}<span class="right-arrow"></span>
          </h2>
        </div>
        <div class="cart__info">
          <h2 class="cart__info-product font_XS">PRODUCT</h2>
          <h2 class="cart__info-price font_XS">PRICE</h2>
          <h2 class="cart__info-qty font_XS">QUANTITY</h2>
          <h2 class="cart__info-total font_XS">TOTAL</h2>
        </div>
        <ul class="cart__items">
          ${cartItems
            .map(
              (x, i) => `
            <li class="cart__item font_XS">
              <a class="cart__product" href="/#/product/${x.product}">
                <h4>${i + 1}.</h4>
                <img src="${x.image}" alt="${x.title}" />
                <div class="cart__about about">
                  <h3 class="font_XS about__title">${x.title}</h3>
                  <p class="font_XS">${x.category}</p>
                  <p class="font_XS">in stock: ${x.stock}</p>
                </div>
              </a>
              <div class="cart__price">${x.price} ₽</div>
              <div class="cart__qty font_XS"><span class="minus" id="${x.product}"></span>${
                x.qty
              }<span class="plus" id="${x.product}"></div>
              <div class="cart__total">${x.price * x.qty} ₽</div>
            </li>
            `
            )
            .slice((this.page - 1) * this.limit, (this.page - 1) * this.limit + this.limit)
            .join('\n')}
        </ul>
      </div>
      <div class="order">
        <h2 class="order__title font_S">YOUR ORDER</h2>
        <div class="order__items font_XS">
          <div>ITEMS:</div>
          <div>${cartItems.reduce((a, c) => a + c.qty, 0)}</div>
        </div>
        <div class="order__sum font_XS">
          <div>TOTAL SUM:</div>
          <div>
            <div><span ${this.promo ? `class="sum sum__active"` : `class="sum"`}>${cartItems.reduce(
          (a, c) => a + c.price * c.qty,
          0
        )} ₽</span> ${this.promo ? `-` + this.promo + `%` : ''}</div>
            <div class="font_red">${
              this.promo
                ? cartItems.reduce((a, c) => a + c.price * c.qty, 0) -
                  (cartItems.reduce((a, c) => a + c.price * c.qty, 0) / 100) * this.promo +
                  ` ₽`
                : ''
            }</div>
            <div class="font_XXS">${
              this.appliedPromo.length > 0 ? `Applied codes: ` + this.appliedPromo.join(', ') : ``
            }</div>
          </div>
        </div>
        <form class="order__promo">
          <input class="order__input font_XS" type="text" placeholder="Enter promo code">
          <button type="submit" class="btn btn_M btn_outline font_red" required>CHECK</button>
        </form>
        <div class="order__codes font_XS">
          <p>${
            this.codes.length > 0
              ? `<button class="add ${this.appliedPromo.includes(this.codes[0]) ? `remove` : ``}"></button>` +
                this.codes[0] +
                ` - 10%`
              : `Promo for test: 'RS', 'EPM'`
          }</p>
          <p>${
            this.codes.length > 1
              ? `<button class="add ${this.appliedPromo.includes(this.codes[1]) ? `remove` : ``}"></button>` +
                this.codes[1] +
                ` - 10%`
              : ''
          }</p>
        </div>
        <button class="btn btn_M btn_primary product-order__one-click">PLACE AN ORDER</button>
    </div>
    ${modal.render()}
    `;
  }
}

const cartScreen = new CartScreen();
export default cartScreen;
