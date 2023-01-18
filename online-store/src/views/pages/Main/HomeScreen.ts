import { rerender } from '../../../constans/utils';
import { CartProduct, Screen, Product } from '../../../constans/types/interfaces';
import { getCartItems, setCartItems } from '../../../constans/localStorage';
import cartScreen from '../Cart/CartScreen';
import header from '../../components/Header/header';
import filter from '../../components/FiltersBlock/Filters';
import sort from '../../components/SortBlock/Sort';

class HomeScreen implements Screen {
  products: Product[];
  isFilterBlock: boolean;

  constructor() {
    this.products = sort.getSortProducts();
    this.isFilterBlock = false;
  }

  productInCart(btns: NodeListOf<Element> | HTMLCollection, i: number) {
    const cartItems = getCartItems();
    const existItem = cartItems.find(({ product }) => product === +btns[i].id);
    btns[i].textContent = existItem ? 'DROP FROM CART' : 'ADD TO CART';
    if (existItem) {
      btns[i].classList.add('btn_primary_disabled');
    } else {
      btns[i].classList.remove('btn_primary_disabled');
    }
  }

  addAndRemoveCart(btns: NodeListOf<Element>, i: number, e: Event) {
    const id = +(e.target as HTMLElement).id;
    const { id: product, title, thumbnail: image, price, category, stock } = this.products[i];
    const cartItems = getCartItems();
    const existItem = cartItems.find(({ product }) => product === id);
    btns[i].textContent = existItem ? 'ADD TO CART' : 'DROP FROM CART';
    if (existItem) {
      btns[i].classList.remove('btn_primary_disabled');
      this.removeFromCart(existItem.product);
    } else {
      this.addToCart({
        product,
        title,
        image,
        price,
        category,
        stock,
        qty: 1,
      });
      btns[i].classList.add('btn_primary_disabled');
    }
  }

  addToCart(item: CartProduct, forceUpdate = false) {
    let cartItems: CartProduct[] = getCartItems();
    const existItem = cartItems.find(({ product }) => product === item.product);
    if (existItem) {
      if (forceUpdate) {
        cartItems = cartItems.map((products) => (products.product === existItem.product ? item : products));
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
    setCartItems(getCartItems().filter(({ product }) => product !== id));
    rerender(header);
  }

  public afterRender() {
    sort.afterRender();
    filter.afterRender();

    this.products = sort.getSortProducts();

    const btns: NodeListOf<Element> = document.querySelectorAll('.btn_primary');
    const btnFilter = document.querySelector('.burger-filter') as HTMLElement;
    const btnClose = document.querySelector('.btn_close') as HTMLElement;
    const filterBlock = document.querySelector('.filter') as HTMLElement;
    const catalog = document.querySelector('.catalog') as HTMLElement;

    for (let i = 0; i < btns.length; i++) {
      // Проверка есть ли данный товар в корзине
      this.productInCart(btns, i);
      // Обработка событий кнопок добавления в корзину
      btns[i].addEventListener('click', (e) => {
        this.addAndRemoveCart(btns, i, e);
      });
    }

    // Обработка события кнопки вызова модального окна фильтра
    if (btnFilter) {
      btnFilter.addEventListener('click', () => {
        filterBlock.classList.add('filter_active');
        catalog.classList.add('catalog_active');
        this.isFilterBlock = true;
      });
      btnClose.addEventListener('click', () => {
        filterBlock.classList.remove('filter_active');
        catalog.classList.remove('catalog_active');
        this.isFilterBlock = false;
      });
    }
  }

  public render() {
    const products = sort.getSortProducts();
    rerender(header);
    return `
    <div class="page__container main__container container">
      <div class="filter ${this.isFilterBlock ? 'filter_active' : ''}">${filter.render()}</div>
      <div class="catalog ${this.isFilterBlock ? 'catalog_active' : ''}">
        <div class="sort">${sort.render()}</div>
        ${
          products.length < 1
            ? `<div class="products products-notfound font_XXL">Products not found!</div>`
            : `
        <ul class="products ${sort.viewProducts === 'list' ? 'products-list' : ''}">
          ${products
            .map(
              ({ id, thumbnail, title, stock, price }) => `
          <li>
            <div class="product">
              <a href="/#/product/${id}">
                <img src="${thumbnail}" alt="${title}" />
              </a>
              <div class="product__info">
                <h5 class="product__name font_S">
                  <a href="/#/product/${id}">${title}</a>
                </h5>
                <div class="product__stock font_XXS font_gray">In stock: ${stock}</div>
              </div>
              <div class="product__buy">
                <h4 class="product__price font_M">${price} ₽</h4>
                <button class="product__btn btn btn_M btn_primary" id="${id}">ADD TO CART</button>
              </div>
            </div>
          </li>
          `
            )
            .join('\n')}
        </ul>
        `
        }
      </div>
    </div>
    `;
  }
}

const homeScreen = new HomeScreen();
export default homeScreen;
