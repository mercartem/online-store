import noUiSlider from 'nouislider';
import '../../../constans/types/nouislider';
import 'nouislider/dist/nouislider.css';
import { Screen, Product, Route } from '../../../constans/types/interfaces';
import products from '../../../constans/data';
import { parseRequestUrl, rerender } from '../../../constans/utils';
import homeScreen from '../../pages/Main/HomeScreen';

class Filter implements Screen {
  url: Route;
  products: Product[];
  filterCategory: string[];
  filterBrand: string[];
  maxPrice: number;
  minPrice: number;
  maxQty: number;
  minQty: number;
  search: string;
  constructor() {
    this.url = parseRequestUrl();
    this.products = products;
    this.filterBrand = this.url.queryParams.brand ? this.url.queryParams.brand.split('-').join(' ').split('+') : [];
    this.filterCategory = this.url.queryParams.category ? this.url.queryParams.category.split('+') : [];
    this.search = this.url.queryParams.search ? this.url.queryParams.search : '';
    this.maxPrice = this.url.queryParams.price
      ? Number(this.url.queryParams.price.split('+')[1])
      : Math.max(...products.map((x) => x.price));
    this.minPrice = this.url.queryParams.price
      ? Number(this.url.queryParams.price.split('+')[0])
      : Math.min(...products.map((x) => x.price));
    this.maxQty = this.url.queryParams.qty
      ? Number(this.url.queryParams.qty.split('+')[1])
      : Math.max(...products.map((x) => x.stock));
    this.minQty = this.url.queryParams.qty
      ? Number(this.url.queryParams.qty.split('+')[0])
      : Math.min(...products.map((x) => x.stock));
  }

  getFilterProducts() {
    return this.applyFilters();
  }

  applyFilters() {
    this.products = this.filterByBrandAndCategory();
    this.products = this.filterByPriceAndStock();
    this.products = this.searchProducts(this.search);
    return this.products;
  }

  filterByBrandAndCategory() {
    const result = products.filter((x) => {
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
    return result;
  }

  filterByPriceAndStock() {
    const products = this.products;
    return products.filter(
      (x) => x.price >= this.minPrice && x.price <= this.maxPrice && x.stock >= this.minQty && x.stock <= this.maxQty
    );
  }

  setSliderValue() {
    this.minPrice = Math.min(...this.products.map((x) => x.price));
    this.maxPrice = Math.max(...this.products.map((x) => x.price));
    this.minQty = Math.min(...this.products.map((x) => x.stock));
    this.maxQty = Math.max(...this.products.map((x) => x.stock));
  }

  searchProducts(search: string): Product[] {
    const products = this.products;
    const nonInformativeFields = ['id', 'thumbnail', 'images', 'discountPercentage'];
    const result = products.filter((product) => {
      return Object.entries(product)
        .filter(([key, val]) => !nonInformativeFields.includes(key))
        .some(([key, val]) => val.toString().toLowerCase().includes(search.toLowerCase()));
    });
    return result;
  }

  resetFilters() {
    this.filterCategory = [];
    this.filterBrand = [];
    this.search = '';
    this.minPrice = Math.min(...products.map((x) => x.price));
    this.maxPrice = Math.max(...products.map((x) => x.price));
    this.minQty = Math.min(...products.map((x) => x.stock));
    this.maxQty = Math.max(...products.map((x) => x.stock));
    this.products = products;
  }

  copyUrl() {
    const url = window.location.href;
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  afterRender() {
    const price = document.querySelector('.input-price') as noUiSlider.Instance;
    const qty = document.querySelector('.input-qty') as noUiSlider.Instance;
    const checkbox: NodeListOf<HTMLInputElement> = document.querySelectorAll('[type="checkbox"]');
    const search = document.querySelector('[type="search"]') as HTMLInputElement;
    const btnReset = document.querySelector('.filter__btn-reset') as HTMLElement;
    const btnCopy = document.querySelector('.filter__btn-copy') as HTMLElement;
    const priceValues: HTMLElement[] = [
      document.querySelector('.input-price__value-1') as HTMLElement,
      document.querySelector('.input-price__value-2') as HTMLElement,
    ];
    const qtyValues: HTMLElement[] = [
      document.querySelector('.input-qty__value-1') as HTMLElement,
      document.querySelector('.input-qty__value-2') as HTMLElement,
    ];

    // Обработка событий чекбокса с категориями и брэндами
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
        this.products =
          this.filterBrand.length < 1 || this.filterCategory.length < 1
            ? this.filterByBrandAndCategory()
            : this.filterByPriceAndStock();
        this.setSliderValue();
        document.location.hash = `/?category=${filter.filterCategory.join('+')}&brand=${filter.filterBrand
          .join('+')
          .split(' ')
          .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
          this.search
        }`;
      });
    }

    // Форматирования числа для noUiSlider
    const formatForSlider = {
      from: function (formattedValue: string) {
        return Number(formattedValue);
      },
      to: function (numericValue: number) {
        return Math.round(numericValue);
      },
    };

    // Создание двойных слайдеров
    noUiSlider.create(price, {
      start: [this.minPrice, this.maxPrice],
      step: 1,
      connect: true,
      range: {
        min: Math.min(...products.map((x) => x.price)),
        max: Math.max(...products.map((x) => x.price)),
      },
      format: formatForSlider,
    });
    noUiSlider.create(qty, {
      start: [this.minQty, this.maxQty],
      step: 1,
      connect: true,
      range: {
        min: Math.min(...products.map((x) => x.stock)),
        max: Math.max(...products.map((x) => x.stock)),
      },
      format: formatForSlider,
    });

    // Обработка событий слайдеров
    price.noUiSlider.on('update', function (values: string[], handle: number): void {
      priceValues[handle].innerHTML = values[handle];
    });
    price.noUiSlider.on('end', function (values: string[]): void {
      [filter.minPrice, filter.maxPrice] = [Number(values[0]), Number(values[1])];
      filter.products = filter.applyFilters();
      document.location.hash = `/?category=${filter.filterCategory.join('+')}&brand=${filter.filterBrand
        .join('+')
        .split(' ')
        .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
        filter.search
      }`;
    });

    qty.noUiSlider.on('update', function (values: string[], handle: number): void {
      qtyValues[handle].innerHTML = values[handle];
    });
    qty.noUiSlider.on('end', function (values: string[]): void {
      [filter.minQty, filter.maxQty] = [Number(values[0]), Number(values[1])];
      filter.products = filter.applyFilters();
      document.location.hash = `/?category=${filter.filterCategory.join('+')}&brand=${filter.filterBrand
        .join('+')
        .split(' ')
        .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
        filter.search
      }`;
    });

    // Обработка события поиска
    search.value = this.search;
    search.focus();
    search.addEventListener('input', () => {
      this.products = search.value.length < this.search.length ? this.filterByBrandAndCategory() : this.applyFilters();
      this.products = this.searchProducts(search.value);
      this.setSliderValue();
      this.search = search.value;
      document.location.hash = `/?category=${filter.filterCategory.join('+')}&brand=${filter.filterBrand
        .join('+')
        .split(' ')
        .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
        this.search
      }`;
    });

    // Обработка события кнопки сброса
    btnReset.addEventListener('click', () => {
      this.resetFilters();
      document.location.hash = '/';
      rerender(homeScreen);
    });

    // Обработка события кнопки копирования
    btnCopy.addEventListener('click', () => {
      this.copyUrl();
      btnCopy.innerHTML = 'COPIED!';
      btnCopy.classList.add('btn_disabled');
    });
  }

  render() {
    return `
    <div class="filter__container">
      <h2 class="font_M filter__found">Found: ${this.products.length}</h2>
      <form class="filter__search">
        <div class="search font_S">
          <div class="search__icon"></div>
          <input type="search" placeholder="Search">
        </div>
      </form>
      <h2 class="font_M filter__title">Price ₽</h2>
      <div class="input-price slider-styled" id="slider-round"></div>
      <div class="input-price__value font_red font_S">
        <div class="input-price__value-1">${this.minPrice}</div>
        <div class="input-price__value-2">${this.maxPrice}</div>
      </div>
      <h2 class="font_M filter__title">Quantity</h2>
      <div class="input-qty slider-styled" id="slider-round-2"></div>
      <div class="input-qty__value font_red font_S">
        <div class="input-qty__value-1">${this.minQty}</div>
        <div class="input-qty__value-2">${this.maxQty}</div>
      </div>
      <h2 class="font_M filter__title">Brand</h2>
      <div class="filter__brand font_XS">
        <label>
          <div>
            <input type="checkbox" id="cska" name="PFC CSKA">
            <span></span>
            PFC CSKA 
          </div>
          <div>(${this.products.filter((x) => x.brand === 'PFC CSKA').length}/5)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="dynamo" name="FC Dynamo">
            <span></span>
            FC Dynamo
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Dynamo').length}/5)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="lokomotiv" name="FC Lokomotiv">
            <span></span>
            FC Lokomotiv
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Lokomotiv').length}/1)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="manchester" name="FC Manchester United">
            <span></span>
            FC Manchester United
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Manchester United').length}/4)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="real" name="FC Real Madrid">
            <span></span>
            FC Real Madrid
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Real Madrid').length}/5)</div>
        </label>
      </div>
      <h2 class="font_M filter__title">Category</h2>
      <div class="filter__category font_XS">
        <label>
          <div>
            <input type="checkbox" id="balls" name="balls">
            <span></span>
            Balls
          </div>
          <div>(${this.products.filter((x) => x.category === 'balls').length}/4)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="uniforms" name="uniforms">
            <span></span>
            Uniforms
          </div>
          <div>(${this.products.filter((x) => x.category === 'uniforms').length}/4)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="scarves" name="scarves">
            <span></span>
            Scarves
          </div>
          <div>(${this.products.filter((x) => x.category === 'scarves').length}/4)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="hats" name="hats">
            <span></span>
            Hats
          </div>
          <div>(${this.products.filter((x) => x.category === 'hats').length}/3)</div>
        </label>
        <label>
          <div>
            <input type="checkbox" id="souvenirs" name="souvenirs">
            <span></span>
            Souvenirs
          </div>
          <div>(${this.products.filter((x) => x.category === 'souvenirs').length}/5)</div>
        </label>
      </div>
      <div class="filter__btns">
        <button class="btn btn_M btn_outline filter__btn-reset">RESET FILTERS</button>
        <button class="btn btn_M btn_outline filter__btn-copy">COPY LINK</button>
      </div>
    </div>
    `;
  }
}

const filter = new Filter();
export default filter;
