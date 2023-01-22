import noUiSlider from 'nouislider';
import '../../../constans/types/nouislider.ts';
import { Screen, Product, Route } from '../../../constans/types/interfaces';
import products from '../../../constans/data';
import { parseRequestUrl } from '../../../constans/utils';

export class Filter implements Screen {
  url: Route;
  products: Product[];
  filterCategorys: string[];
  filterBrands: string[];
  sortProducts: string;
  viewProducts: string;
  maxPrice: number;
  minPrice: number;
  maxQty: number;
  minQty: number;
  search: string;
  isFocus: boolean;
  constructor() {
    this.url = parseRequestUrl();
    this.products = products;
    this.sortProducts = this.url.queryParams.sort ? this.url.queryParams.sort : '';
    this.viewProducts = this.url.queryParams.view ? this.url.queryParams.view : 'block';
    this.filterBrands = this.url.queryParams.brand ? this.url.queryParams.brand.split('-').join(' ').split('+') : [];
    this.filterCategorys = this.url.queryParams.category ? this.url.queryParams.category.split('+') : [];
    this.search = this.url.queryParams.search ? this.url.queryParams.search : '';
    this.isFocus = false;
    this.maxPrice = this.url.queryParams.price
      ? +this.url.queryParams.price.split('+')[1]
      : Math.max(...products.map((product) => product.price));
    this.minPrice = this.url.queryParams.price
      ? +this.url.queryParams.price.split('+')[0]
      : Math.min(...products.map((product) => product.price));
    this.maxQty = this.url.queryParams.qty
      ? +this.url.queryParams.qty.split('+')[1]
      : Math.max(...products.map((product) => product.stock));
    this.minQty = this.url.queryParams.qty
      ? +this.url.queryParams.qty.split('+')[0]
      : Math.min(...products.map((product) => product.stock));
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

  filterByBrandAndCategory(productsAll: Product[] = products) {
    const result = productsAll.filter((product) => {
      if (this.filterBrands.length < 1 && this.filterCategorys.length < 1) {
        return true;
      }
      if (this.filterBrands.length > 0 && this.filterCategorys.length > 0) {
        return this.filterBrands.includes(product.brand) && this.filterCategorys.includes(product.category);
      } else {
        return this.filterBrands.includes(product.brand) || this.filterCategorys.includes(product.category);
      }
    });
    return result;
  }

  filterByPriceAndStock(products = this.products) {
    return products.filter(
      (product) =>
        product.price >= this.minPrice &&
        product.price <= this.maxPrice &&
        product.stock >= this.minQty &&
        product.stock <= this.maxQty
    );
  }

  setSliderValue() {
    this.minPrice = Math.min(...this.products.map((product) => product.price));
    this.maxPrice = Math.max(...this.products.map((product) => product.price));
    this.minQty = Math.min(...this.products.map((product) => product.stock));
    this.maxQty = Math.max(...this.products.map((product) => product.stock));
  }

  searchProducts(search: string, products = this.products): Product[] {
    const nonInformativeFields = ['id', 'thumbnail', 'images', 'discountPercentage'];
    const result = products.filter((product) => {
      return Object.entries(product)
        .filter(([key, val]) => !nonInformativeFields.includes(key))
        .some(([key, val]) => val.toString().toLowerCase().includes(search.toLowerCase()));
    });
    return result;
  }

  resetFilters() {
    this.filterCategorys = [];
    this.filterBrands = [];
    this.search = '';
    this.minPrice = Math.min(...products.map((product) => product.price));
    this.maxPrice = Math.max(...products.map((product) => product.price));
    this.minQty = Math.min(...products.map((product) => product.stock));
    this.maxQty = Math.max(...products.map((product) => product.stock));
    this.products = products;
  }

  CopyUrlWithFilters() {
    const url = window.location.href;
    const copyText = document.createElement('input');
    copyText.value = url;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);;
  }

  getQueryParamsFromSort() {
    this.url = parseRequestUrl();
    this.sortProducts = this.url.queryParams.sort ? this.url.queryParams.sort : '';
    this.viewProducts = this.url.queryParams.view ? this.url.queryParams.view : 'block';
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

    // Получаем актуальные данные параметров из компонента сортировки
    this.getQueryParamsFromSort();

    // Обработка событий чекбокса с категориями и брэндами
    for (let i = 0; i < checkbox.length; i++) {
      if (this.filterBrands.includes(checkbox[i].name) || this.filterCategorys.includes(checkbox[i].name)) {
        checkbox[i].checked = true;
      }
      checkbox[i].addEventListener('change', (e) => {
        if (checkbox[i].checked) {
          i < checkbox.length / 2
            ? this.filterBrands.push(checkbox[i].name)
            : this.filterCategorys.push(checkbox[i].name);
        } else {
          i < checkbox.length / 2
            ? (this.filterBrands = this.filterBrands.filter((product) => product !== checkbox[i].name))
            : (this.filterCategorys = this.filterCategorys.filter((product) => product !== checkbox[i].name));
        }
        this.products =
          this.filterBrands.length < 1 || this.filterCategorys.length < 1
            ? this.filterByBrandAndCategory()
            : this.filterByPriceAndStock();
        this.setSliderValue();
        document.location.hash = `/?category=${this.filterCategorys.join('+')}&brand=${this.filterBrands
          .join('+')
          .split(' ')
          .join('-')}&price=${this.minPrice}+${this.maxPrice}&qty=${this.minQty}+${this.maxQty}&search=${
          this.search
        }&sort=${this.sortProducts}&view=${this.viewProducts}`;
      });
    }

    // Форматирования числа для noUiSlider
    const formatForSlider = {
      from: function (formattedValue: string) {
        return +formattedValue;
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
        min: Math.min(...products.map((product) => product.price)),
        max: Math.max(...products.map((product) => product.price)),
      },
      format: formatForSlider,
    });

    noUiSlider.create(qty, {
      start: [this.minQty, this.maxQty],
      step: 1,
      connect: true,
      range: {
        min: Math.min(...products.map((product) => product.stock)),
        max: Math.max(...products.map((product) => product.stock)),
      },
      format: formatForSlider,
    });

    // Обработка событий слайдеров
    price.noUiSlider.on('update', function (values: string[], handle: number): void {
      priceValues[handle].innerHTML = values[handle];
    });

    price.noUiSlider.on('end', function (values: string[]): void {
      [filter.minPrice, filter.maxPrice] = [+values[0], +values[1]];
      filter.products = filter.applyFilters();
      document.location.hash = `/?category=${filter.filterCategorys.join('+')}&brand=${filter.filterBrands
        .join('+')
        .split(' ')
        .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
        filter.search
      }&sort=${filter.sortProducts}&view=${filter.viewProducts}`;
    });

    qty.noUiSlider.on('update', function (values: string[], handle: number): void {
      qtyValues[handle].innerHTML = values[handle];
    });
    
    qty.noUiSlider.on('end', function (values: string[]): void {
      [filter.minQty, filter.maxQty] = [+values[0], +values[1]];
      filter.products = filter.applyFilters();
      document.location.hash = `/?category=${filter.filterCategorys.join('+')}&brand=${filter.filterBrands
        .join('+')
        .split(' ')
        .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
        filter.search
      }&sort=${filter.sortProducts}&view=${filter.viewProducts}`;
    });

    // Обработка события поиска
    search.value = this.search;
    if (this.search.length > 0 || this.isFocus) {
      search.focus();
      this.isFocus = false;
    }
    search.addEventListener('input', () => {
      this.products = search.value.length < this.search.length ? this.filterByBrandAndCategory() : this.applyFilters();
      this.products = this.searchProducts(search.value);
      this.setSliderValue();
      this.isFocus = this.search.length === 1 ? true : false;
      this.search = search.value;
      document.location.hash = `/?category=${this.filterCategorys.join('+')}&brand=${this.filterBrands
        .join('+')
        .split(' ')
        .join('-')}&price=${this.minPrice}+${this.maxPrice}&qty=${this.minQty}+${this.maxQty}&search=${
        this.search
      }&sort=${this.sortProducts}&view=${this.viewProducts}`;
    });

    // Обработка события кнопки сброса
    btnReset.addEventListener('click', () => {
      this.resetFilters();
      document.location.hash = '/';
    });

    // Обработка события кнопки копирования
    btnCopy.addEventListener('click', () => {
      this.CopyUrlWithFilters();
      btnCopy.textContent = 'COPIED!';
      btnCopy.classList.add('btn_disabled');
    });
  }

  render() {
    return `
    <div class="filter__container">
      <h2 class="font_M filter__found">Found: ${this.products.length}</h2>
      <button class="btn_close">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z" />
        </svg>
      </button>
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
            <input class="checkbox" type="checkbox" id="cska" name="PFC CSKA">
            <span></span>
            PFC CSKA 
          </div>
          <div>(${this.products.filter((x) => x.brand === 'PFC CSKA').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="dynamo" name="FC Dynamo">
            <span></span>
            FC Dynamo
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Dynamo').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="lokomotiv" name="FC Lokomotiv">
            <span></span>
            FC Lokomotiv
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Lokomotiv').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="manchester" name="FC Manchester United">
            <span></span>
            FC Manchester United
          </div>
          <div>(${this.products.filter((x) => x.brand === 'FC Manchester United').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="real" name="FC Real Madrid">
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
            <input class="checkbox" type="checkbox" id="balls" name="balls">
            <span></span>
            Balls
          </div>
          <div>(${this.products.filter((x) => x.category === 'balls').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="uniforms" name="uniforms">
            <span></span>
            Uniforms
          </div>
          <div>(${this.products.filter((x) => x.category === 'uniforms').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="scarves" name="scarves">
            <span></span>
            Scarves
          </div>
          <div>(${this.products.filter((x) => x.category === 'scarves').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="hats" name="hats">
            <span></span>
            Hats
          </div>
          <div>(${this.products.filter((x) => x.category === 'hats').length}/5)</div>
        </label>
        <label>
          <div>
            <input class="checkbox" type="checkbox" id="souvenirs" name="souvenirs">
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
