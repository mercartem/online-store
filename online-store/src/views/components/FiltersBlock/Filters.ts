import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Screen, Product, Route } from '../../../constans/types/interfaces';
import products from '../../../constans/data';
import { parseRequestUrl } from '../../../constans/utils';

class Filter implements Screen {
  url: Route;
  products: Product[];
  filterCategory: string[];
  filterBrand: string[];
  constructor() {
    this.url = parseRequestUrl();
    this.products = products;
    this.filterBrand = this.url.queryParams.brand ? this.url.queryParams.brand.split('-').join(' ').split('+') : [];
    this.filterCategory = this.url.queryParams.category ? this.url.queryParams.category.split('+') : [];
  }
  getFilterProducts() {
    this.products = this.url.queryParams ? this.filterProducts() : this.products;
    return this.products;
  }
  filterProducts() {
    return products.filter((x) => {
      if (this.filterBrand.length < 1 && this.filterCategory.length < 1) {
        return true;
      }
      if (this.filterBrand.length > 0 && this.filterCategory.length > 0) {
        if (this.filterBrand.includes(x.brand) && this.filterCategory.includes(x.category)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.filterBrand.includes(x.brand) || this.filterCategory.includes(x.category)) {
          return true;
        } else {
          return false;
        }
      }
    });
  }
  afterRender() {
    const price = document.querySelector('.input-price') as HTMLInputElement;
    const qty = document.querySelector('.input-qty') as HTMLInputElement;
    const checkbox: NodeListOf<HTMLInputElement> = document.querySelectorAll('[type="checkbox"]');

    for (let i = 0; i < checkbox.length; i++) {
      if (this.filterBrand.includes(checkbox[i].name) || this.filterCategory.includes(checkbox[i].name)) {
        checkbox[i].checked = true;
      }
      checkbox[i].addEventListener('change', (e) => {
        if (checkbox[i].checked) {
          i < checkbox.length / 2
            ? this.filterBrand.push(checkbox[i].name)
            : this.filterCategory.push(checkbox[i].name);
        } else {
          i < checkbox.length / 2
            ? (this.filterBrand = this.filterBrand.filter((x) => x !== checkbox[i].name))
            : (this.filterCategory = this.filterCategory.filter((x) => x !== checkbox[i].name));
        }
        this.products = this.filterProducts();
        if (this.filterCategory.length > 0 && this.filterBrand.length > 0) {
          document.location.hash = `/?category=${this.filterCategory.join('+')}&brand=${this.filterBrand
            .join('+')
            .split(' ')
            .join('-')}`;
        }
        if (this.filterCategory.length > 0 && this.filterBrand.length < 1) {
          document.location.hash = `/?category=${this.filterCategory.join('+').split(' ').join('-')}`;
        }
        if (this.filterCategory.length < 1 && this.filterBrand.length > 0) {
          document.location.hash = `/?brand=${this.filterBrand.join('+').split(' ').join('-')}`;
        }
        if (this.filterCategory.length < 1 && this.filterBrand.length < 1) {
          document.location.hash = '/';
        }
      });
    }

    noUiSlider.create(price, {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });
    noUiSlider.create(qty, {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });
  }
  render() {
    return `
    <div class="filter__container">
      <h2 class="font_M filter__found">Found: 21</h2>
      <form class="filter__search">
        <div class="search font_S">
          <div class="search__icon"></div>
          <input type="search" placeholder="Search">
          <div class="search__icon-close"></div>
        </div>
      </form>
      <h2 class="font_M filter__title">Price ₽</h2>
      <div class="input-price slider-styled" id="slider-round"></div>
      <div class="input-price__value font_red font_S">
        <div class="input-price__value-1">0</div>
        <div class="input-price__value-2">100</div>
      </div>
      <h2 class="font_M filter__title">Quantity</h2>
      <div class="input-qty slider-styled" id="slider-round-2"></div>
      <div class="input-qty__value font_red font_S">
        <div class="input-qty__value-1">0</div>
        <div class="input-qty__value-2">100</div>
      </div>
      <h2 class="font_M filter__title">Brand</h2>
      <div class="filter__brand font_XS">
        <label>
          <input type="checkbox" id="cska" name="PFC CSKA">
          <span></span>
          PFC CSKA
        </label>
        <label>
          <input type="checkbox" id="dynamo" name="FC Dynamo">
          <span></span>
          FC Dynamo
        </label>
        <label>
          <input type="checkbox" id="lokomotiv" name="FC Lokomotiv">
          <span></span>
          FC Lokomotiv
        </label>
        <label>
          <input type="checkbox" id="manchester" name="FC Manchester United">
          <span></span>
          FC Manchester United
        </label>
        <label>
          <input type="checkbox" id="real" name="FC Real Madrid">
          <span></span>
          FC Real Madrid
        </label>
      </div>
      <h2 class="font_M filter__title">Category</h2>
      <div class="filter__category font_XS">
        <label>
          <input type="checkbox" id="balls" name="balls">
          <span></span>
          Balls
        </label>
        <label>
          <input type="checkbox" id="uniforms" name="uniforms">
          <span></span>
          Uniforms
        </label>
        <label>
          <input type="checkbox" id="scarves" name="scarves">
          <span></span>
          Scarves
        </label>
        <label>
          <input type="checkbox" id="hats" name="hats">
          <span></span>
          Hats
        </label>
        <label>
          <input type="checkbox" id="souvenirs" name="souvenirs">
          <span></span>
          Souvenirs
        </label>
      </div>
      <div class="filter__btns">
        <button class="btn btn_M btn_outline filter__btn">RESET FILTERS</button>
        <button class="btn btn_M btn_outline filter__btn">COPY LINK</button>
      </div>
    </div>
    `;
  }
}

const filter = new Filter();
export default filter;
