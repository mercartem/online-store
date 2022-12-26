// import products from '../../../constans/data';
import { rerender } from '../../../constans/utils';
import { CartProduct, Screen, Product } from '../../../constans/types/interfaces';
import { getCartItems, setCartItems } from '../../../constans/localStorage';
import cartScreen from '../Cart/CartScreen';
import header from '../../components/Header/header';
import filter from '../../components/FiltersBlock/Filters';

class HomeScreen implements Screen {
  products: Product[];
  constructor() {
    this.products = filter.getFilterProducts();
  }
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
    } else {
      cartScreen.limit = getCartItems().length;
      cartScreen.page = 1;
    }
    rerender(header);
  }
  removeFromCart(id: number) {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    rerender(header);
  }
  public afterRender() {
    filter.afterRender();
    this.products = filter.getFilterProducts();

    const btns = document.querySelectorAll('.btn_primary');
    for (let i = 0; i < btns.length; i++) {
      const cartItems = getCartItems();
      const existItem = cartItems.find((x) => x.product === Number(btns[i].id));
      if (existItem) {
        btns[i].textContent = 'DROP FROM CART';
        btns[i].classList.add('btn_primary_disabled');
      } else {
        btns[i].textContent = 'ADD TO CART';
        btns[i].classList.remove('btn_primary_disabled');
      }
      btns[i].addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const id = Number(target.id);
        const product = this.products[i];
        const cartItems = getCartItems();
        const existItem = cartItems.find((x) => x.product === id);
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

  public render() {
    const products = filter.getFilterProducts();
    rerender(header);
    return `
    <div class="page__container main__container container">
      <div class="filter">${filter.render()}</div>
      ${
        products.length < 1
          ? `<div class="products">Продукт не найден!</div>`
          : `
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
      `
      }
    </div>
    `;
  }
}

const homeScreen = new HomeScreen();
export default homeScreen;
