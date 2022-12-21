import products from '../../../constans/data';
import { rerender } from '../../../constans/utils';
import { CartProduct, Screen } from '../../../constans/types/interfaces';
import { getCartItems, setCartItems } from '../../../constans/localStorage';
import cartScreen from '../Cart/CartScreen';

class HomeScreen implements Screen {
  addToCart(item: CartProduct, forceUpdate = false) {
    let cartItems: CartProduct[] = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      if (forceUpdate) {
        cartItems = cartItems.map((x) => (x.product === existItem.product ? item : x));
      }
    } else {
      cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
      rerender(cartScreen);
    }
  }
  removeFromCart(id: number) {
    setCartItems(getCartItems().filter((x) => x.product !== id));
  }
  afterRender() {
    const btns = document.querySelectorAll('.btn_M');
    for (let i = 0; i < btns.length; i++) {
      const cartItems = getCartItems();
      const existItem = cartItems.find((x) => x.product === i + 1);
      if (existItem) {
        btns[i].textContent = 'DROP FROM CART';
        btns[i].classList.add('btn_primary_disabled');
      } else {
        btns[i].textContent = 'ADD TO CART';
        btns[i].classList.remove('btn_primary_disabled');
      }
      btns[i].addEventListener('click', () => {
        const product = products[i];
        const cartItems = getCartItems();
        const existItem = cartItems.find((x) => x.product === i + 1);
        if (existItem) {
          btns[i].textContent = 'ADD TO CART';
          btns[i].classList.remove('btn_primary_disabled');
          this.removeFromCart(existItem.product);
        } else {
          this.addToCart({
            product: product.id,
            title: product.title,
            image: product.thumbnail,
            price: product.price,
            category: product.category,
            stock: product.stock,
            qty: 1,
          });
          btns[i].textContent = 'DROP FROM CART';
          btns[i].classList.add('btn_primary_disabled');
        }
      });
    }
  }
  render() {
    return `
    <div class="page__container main__container container">
      <ul class="products">
        ${products
          .map(
            (product) => `
        <li>
          <div class="product">
            <h5 class="product__name font_S">
              <a href="/#/product/${product.id}">${product.title}</a>
            </h5>
            <a href="/#/product/${product.id}">
              <img src="${product.thumbnail}" alt="${product.title}" />
            </a>
            <h4 class="product__price font_M">${product.price} ₽</h4>
            <button class="btn btn_M btn_primary" id="${product.id}">ADD TO CART</button>
            <div class="product__stock font_XXS">In stock: ${product.stock}</div>
          </div>
        </li>
        `
          )
          .join('\n')}
      </ul>
    </div>
    `;
  }
}

const homeScreen = new HomeScreen();
export default homeScreen;
