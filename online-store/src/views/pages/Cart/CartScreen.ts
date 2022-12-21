/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Screen } from '../../../constans/types/interfaces';
import { getCartItems } from '../../../constans/localStorage';
import homeScreen from '../Main/HomeScreen';
import { rerender } from '../../../constans/utils';

class CartScreen implements Screen {
  limit: number;
  constructor() {
    this.limit = 0;
  }
  afterRender() {
    const btnPlus: NodeListOf<HTMLElement> = document.querySelectorAll('.plus');
    const btnMinus: NodeListOf<HTMLElement> = document.querySelectorAll('.minus');
    const select = document.querySelector('.select') as HTMLElement;
    select.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.limit = Number(target.value);
      document.location.hash = `/cart/?limit=${Number(target.value)}`;
    });
    for (let i = 0; i < btnPlus.length; i++) {
      btnPlus[i].addEventListener('click', () => {
        const item = getCartItems();
        const qtyCount = item[i].qty < item[i].stock ? item[i].qty + 1 : item[i].qty;
        homeScreen.addToCart({ ...item[i], qty: qtyCount }, true);
      });
      btnMinus[i].addEventListener('click', () => {
        const item = getCartItems();
        const qtyCount = item[i].qty - 1;
        if (qtyCount < 1) {
          homeScreen.removeFromCart(item[i].product);
          rerender(cartScreen);
        } else {
          homeScreen.addToCart({ ...item[i], qty: qtyCount }, true);
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
          <h2 class="cart__pgn">PAGE:<span class="left-arrow"></span>1<span class="right-arrow"></span></h2>
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
              <div class="cart__qty font_S"><span class="minus"></span>${x.qty}<span class="plus"></div>
              <div class="cart__total">${x.price * x.qty} ₽</div>
            </li>
            `
            )
            .slice(0, this.limit ? this.limit : cartItems.length)
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
          <input>
          <button></button>
        </div>
        <button class="btn btn_M btn_primary">PLACE AN ORDER</button>
    </div>
    `;
  }
}

const cartScreen = new CartScreen();
export default cartScreen;
