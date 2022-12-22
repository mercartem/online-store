/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Screen, Route, CartProduct } from '../../../constans/types/interfaces';
import { getCartItems } from '../../../constans/localStorage';
import homeScreen from '../Main/HomeScreen';
import { rerender } from '../../../constans/utils';
import { parseRequestUrl } from '../../../constans/utils';

class CartScreen implements Screen {
  limit: number;
  url: Route;
  page: number;
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
  }
  afterRender() {
    const btnPlus: NodeListOf<HTMLElement> = document.querySelectorAll('.plus');
    const btnMinus: NodeListOf<HTMLElement> = document.querySelectorAll('.minus');
    const rightArrow = document.querySelector('.right-arrow') as HTMLElement;
    const leftArrow = document.querySelector('.left-arrow') as HTMLElement;
    const select = document.querySelector('.select') as HTMLElement;

    rightArrow.addEventListener('click', () => {
      this.page < getCartItems().length / this.limit ? this.page++ : this.page;
      document.location.hash = `/cart?limit=${this.limit}&page=${this.page}`;
    });
    leftArrow.addEventListener('click', () => {
      this.page > 1 ? this.page-- : this.page;
      document.location.hash = `/cart?limit=${this.limit}&page=${this.page}`;
    });

    select.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.limit = Number(target.value);
      this.page = this.page <= Math.ceil(getCartItems().length / this.limit) ? this.page : 1;
      document.location.hash = `/cart?limit=${Number(target.value)}`;
    });

    for (let i = 0; i < btnPlus.length; i++) {
      btnPlus[i].addEventListener('click', (e) => {
        const items = getCartItems();
        const target = e.target as HTMLElement;
        const id = Number(target.id);
        const item = items.find((x) => x.product === id) as CartProduct;
        const qtyCount = item.qty < item.stock ? item.qty + 1 : item.qty;
        homeScreen.addToCart({ ...item, qty: qtyCount }, true);
      });
      btnMinus[i].addEventListener('click', (e) => {
        const items = getCartItems();
        const target = e.target as HTMLElement;
        const id = Number(target.id);
        const item = items.find((x) => x.product === id) as CartProduct;
        const qtyCount = item.qty - 1;
        if (qtyCount < 1) {
          homeScreen.removeFromCart(item.product);
          this.page = this.page <= Math.ceil(getCartItems().length / this.limit) ? this.page : this.page - 1;
          rerender(cartScreen);
        } else {
          homeScreen.addToCart({ ...item, qty: qtyCount }, true);
        }
      });
    }
  }
  render() {
    const cartItems = getCartItems();
    return cartItems.length < 1
      ? `<div>Cart is empty...</div>`
      : `
    <div class="page__container container shopping__container">
      <div class= "cart">
        <div class="cart__page">
          <h2>
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
          <h2 class="cart__pgn">PAGE:<span class="left-arrow"></span>${this.page}<span class="right-arrow"></span></h2>
        </div>
        <div class="cart__info">
          <h2 class="cart__info-product">PRODUCT</h2>
          <h2 class="cart__info-price">PRICE</h2>
          <h2 class="cart__info-qty">QUANTITY</h2>
          <h2 class="cart__info-total">TOTAL</h2>
        </div>
        <ul class="cart__items">
          ${cartItems
            .map(
              (x, i) => `
            <li class="cart__item font_XS">
              <a class="cart__product" href="/#/product/${x.product}">
                <h4>${i + 1}.</h4>
                <img src="${x.image}" alt="${x.title}" />
                <div class="cart__about">
                  <h3 class="font_S">${x.title}</h3>
                  <p class="font_XS">${x.category}</p>
                  <p class="font_XS">in stock: ${x.stock}</p>
                </div>
              </a>
              <div class="cart__price">${x.price} ₽</div>
              <div class="cart__qty font_S"><span class="minus" id="${x.product}"></span>${
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
        <h2 class="order__title">YOUR ORDER</h2>
        <div class="order__items font_XS">
          <div>ITEMS:</div>
          <div>${cartItems.reduce((a, c) => a + c.qty, 0)}</div>
        </div>
        <div class="order__sum font_XS">
          <div>TOTAL SUM:</div>
          <div>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)} ₽</div>
        </div>
        <div class="order__promo">
          <input class="font_XS" placeholder="Enter Promo code">
          <button class="btn btn_M btn_outline font_red">APPLY</button>
        </div>
        <button class="btn btn_M btn_primary">PLACE AN ORDER</button>
    </div>
    `;
  }
}

const cartScreen = new CartScreen();
export default cartScreen;
