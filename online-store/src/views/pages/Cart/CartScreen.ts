/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Screen } from '../../../constans/types/interfaces';
import { getCartItems } from '../../../constans/localStorage';

class CartScreen implements Screen {
  render() {
    const cartItems = getCartItems();
    return `
    <div class="page__container container shopping__container">
      <div class= "cart">
        <div class="cart__page">
          <h2>ITEMS:</h2>
          <h2 class="cart__pgn">PAGE:<span class="left-arrow"></span>1<span class="right-arrow"></span></h2>
        </div>
        <div class="cart__info">
          <h2 class="cart__info-product">PRODUCT</h2>
          <h2>PRICE</h2>
          <h2>QUANTITY</h2>
          <h2>TOTAL</h2>
        </div>
        <ul class="cart__items">
          ${cartItems
            .map(
              (x) => `
            <li class="cart__item">
              <a class="cart__product" href="/#/product/${x.product}">
                <img src="${x.image}" alt="${x.title}" />
                <div class="cart__about">
                  <h3 class="font_S">${x.title}</h3>
                  <p class="font_XXS">${x.category}</p>
                  <p class="font_XXS">In stock: ${x.stock}</p>
                </div>
              </a>
              <div class="cart__price">${x.price} ₽</div>
              <div class="cart__qty">1</div>
              <div class="cart__total">${x.price} ₽</div>
            </li>
            `
            )
            .join('\n')}
        </ul>
      </div>
      <div class="order">
        <h2>YOUR ORDER</h2>
        <div class="order__items">
          <div>ITEMS:</div>
          <div>1</div>
        </div>
        <div class="order__sum">
          <div>TOTAL SUM:</div>
          <div>1111</div>
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

export default CartScreen;
