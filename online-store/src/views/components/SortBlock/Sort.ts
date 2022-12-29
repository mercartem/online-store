import { Screen, Product, Route } from '../../../constans/types/interfaces';
import { parseRequestUrl } from '../../../constans/utils';
import filter from '../FiltersBlock/Filters';

class Sort implements Screen {
  products: Product[];
  url: Route;
  sortProducts: string;
  viewProducts: string;

  constructor() {
    this.url = parseRequestUrl();
    this.products = filter.getFilterProducts();
    this.sortProducts = this.url.queryParams.sort ? this.url.queryParams.sort : '';
    this.viewProducts = this.url.queryParams.view ? this.url.queryParams.view : 'block';
  }

  getSortProducts() {
    this.products = filter.getFilterProducts();
    return this.sort(this.sortProducts);
  }

  selectSort(item: HTMLDivElement) {
    const inputSort = document.querySelector('.sort__input') as HTMLInputElement;
    inputSort.value = item.innerHTML;
    this.sort(item.id);
    this.sortProducts = item.id;
    document.location.hash = `/?category=${filter.filterCategory.join('+')}&brand=${filter.filterBrand
      .join('+')
      .split(' ')
      .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
      filter.search
    }&sort=${this.sortProducts}&view=${this.viewProducts}`;
  }

  sort(sortProducts: string): Product[] {
    switch (sortProducts) {
      case 'priceHigh':
        return this.products.sort((a, b) => Number(a.price) - Number(b.price));
      case 'priceLow':
        return this.products.sort((a, b) => Number(b.price) - Number(a.price));
      case 'nameAZ':
        return this.products.sort((a, b) => a.title.localeCompare(b.title));
      case 'nameZA':
        return this.products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return this.products;
    }
  }

  selectView(item: HTMLButtonElement) {
    this.viewProducts = item.id;
    document.location.hash = `/?category=${filter.filterCategory.join('+')}&brand=${filter.filterBrand
      .join('+')
      .split(' ')
      .join('-')}&price=${filter.minPrice}+${filter.maxPrice}&qty=${filter.minQty}+${filter.maxQty}&search=${
      filter.search
    }&sort=${this.sortProducts}&view=${this.viewProducts}`;
  }

  afterRender() {
    this.products = filter.getFilterProducts();

    // Обработчик события открытия списка сортировки
    const dropdown = document.querySelector('.sort__dropdown') as HTMLDivElement;
    dropdown.addEventListener('click', () => {
      dropdown.classList.toggle('sort__dropdown-active');
    });

    // Обработчик события закрытия списка сортировка не по элементу
    document.body.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!dropdown.contains(target)) {
        dropdown.classList.remove('sort__dropdown-active');
      }
    });

    // Обработчик события выбора сортировки
    const sortItems = document.querySelectorAll('.sort__item') as NodeListOf<HTMLDivElement>;
    sortItems.forEach((element) => {
      element.addEventListener('click', () => {
        this.selectSort(element);
      });
    });

    // Выбранная сортировка
    sortItems.forEach((element) => {
      if (this.sortProducts === element.id) {
        const inputSort = document.querySelector('.sort__input') as HTMLInputElement;
        inputSort.value = element.innerHTML;
      }
    });

    const viewItems = document.querySelectorAll('.view__item') as NodeListOf<HTMLButtonElement>;
    viewItems.forEach((element) => {
      element.addEventListener('click', () => {
        if (!element.classList.contains('view__item-active')) {
          for (const el of viewItems) {
            el.classList.remove('view__item-active');
          }

          element.classList.add('view__item-active');
          this.selectView(element);
        }
      });
    });

    // Выбранный вид продукта
    viewItems.forEach((element) => {
      if (this.viewProducts === element.id) {
        element.classList.add('view__item-active');
      } else {
        element.classList.remove('view__item-active');
      }
    });
  }

  render() {
    return `
    <div class="sort__container">
      <div class="burger-filter"><div></div></div>
      <div class="sort__dropdown font_S">
        <input type="text" class="sort__input" readonly placeholder="Sort">
        <div class="sort__options">
          <div id="priceHigh" class="sort__item">Ascending prices</div>
          <div id="priceLow" class="sort__item">Descending prices</div>
          <div id="nameAZ" class="sort__item">By name (A-Z)</div>
          <div id="nameZA" class="sort__item">By name (Z-A)</div>
        </div>
      </div>
      <div class="sort__view view">
        <button id="block" class="view__item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.12954 11.9445C5.12954 12.2871 4.85181 12.5648 4.50926 12.5648H0.620277C0.277721 12.5648 0 12.2871 0 11.9445V8.05552C0 7.71296 0.277721 7.43524 0.620277 7.43524H4.50926C4.85186 7.43524 5.12954 7.71296 5.12954 8.05552V11.9445Z"/>
            <path d="M20.0002 11.9445C20.0002 12.287 19.7225 12.5648 19.3799 12.5648H15.4909C15.1483 12.5648 14.8706 12.287 14.8706 11.9445V8.05546C14.8706 7.7129 15.1483 7.43518 15.4909 7.43518H19.3799C19.7225 7.43518 20.0002 7.7129 20.0002 8.05546V11.9445Z"/>
            <path d="M11.9445 0.101868H8.0552C7.71274 0.101868 7.43506 0.379545 7.43506 0.722365V4.61104C7.43506 4.95377 7.71274 5.23145 8.0552 5.23145H11.9445C12.287 5.23145 12.5647 4.95377 12.5647 4.61104V0.722365C12.5647 0.379545 12.287 0.101868 11.9445 0.101868Z"/>
            <path d="M4.50913 0.101868H0.620498C0.277677 0.101868 0 0.379545 0 0.722365V4.61104C0 4.95377 0.277677 5.23145 0.620498 5.23145H4.50917C4.8519 5.23145 5.12958 4.95377 5.12958 4.61104V0.722365C5.12954 0.379545 4.85186 0.101868 4.50913 0.101868Z"/>
            <path d="M19.3796 0.101868H15.491C15.1483 0.101868 14.8706 0.379545 14.8706 0.722365V4.61104C14.8706 4.95377 15.1483 5.23145 15.491 5.23145H19.3796C19.7225 5.23145 20.0001 4.95377 20.0001 4.61104V0.722365C20.0001 0.379545 19.7225 0.101868 19.3796 0.101868Z"/>
            <path d="M11.9445 7.43518H8.0552C7.71274 7.43518 7.43506 7.71286 7.43506 8.05568V11.9444C7.43506 12.2871 7.71274 12.5648 8.0552 12.5648H11.9445C12.287 12.5648 12.5647 12.2871 12.5647 11.9444V8.05568C12.5647 7.71286 12.287 7.43518 11.9445 7.43518Z"/>
            <path d="M11.9445 14.7685H8.0552C7.71274 14.7685 7.43506 15.0462 7.43506 15.389V19.2777C7.43506 19.6204 7.71274 19.8981 8.0552 19.8981H11.9445C12.287 19.8981 12.5647 19.6204 12.5647 19.2777V15.389C12.5647 15.0462 12.287 14.7685 11.9445 14.7685Z"/>
            <path d="M5.12954 19.2779C5.12954 19.6204 4.85181 19.8981 4.50926 19.8981H0.620277C0.277721 19.8981 0 19.6204 0 19.2779V15.3889C0 15.0463 0.277721 14.7686 0.620277 14.7686H4.50926C4.85186 14.7686 5.12954 15.0463 5.12954 15.3889V19.2779Z"/>
            <path d="M20.0002 19.2779C20.0002 19.6204 19.7225 19.8981 19.3799 19.8981H15.4909C15.1483 19.8981 14.8706 19.6204 14.8706 19.2779V15.3888C14.8706 15.0463 15.1483 14.7686 15.4909 14.7686H19.3799C19.7225 14.7686 20.0002 15.0463 20.0002 15.3888V19.2779Z"/>
          </svg>
        </button>
        <button id="list" class="view__item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0001 14.2424H4.3291V17.0996H20.0001V14.2424Z"/>
            <path d="M20.0001 8.61469H4.3291V11.4718H20.0001V8.61469Z"/>
            <path d="M20.0001 2.81384H4.3291V5.67099H20.0001V2.81384Z"/>
            <path d="M2.85714 14.329H0V17.1861H2.85714V14.329Z"/>
            <path d="M2.85714 8.61469H0V11.4718H2.85714V8.61469Z"/>
            <path d="M2.85714 2.81384H0V5.67099H2.85714V2.81384Z"/>
          </svg>
        </button>
      </div>
    </div>`;
  }
}

const sort = new Sort();
export default sort;
