import { Screen, Route } from '../../../constans/types/interfaces';
import products from '../../../constans/data';
import { parseRequestUrl, rerender } from '../../../constans/utils';
import { Swiper } from 'swiper';
import { getCartItems } from '../../../constans/localStorage';
import homeScreen from '../Main/HomeScreen';
import header from '../../components/Header/header';

class ProductScreen implements Screen {
  public afterRender(): void {
    (document.querySelector('.product-order__one-click') as HTMLDivElement).addEventListener('click', () => {
      console.log('click');
      document.location.hash = `/cart`;
    });

    const request: Route = parseRequestUrl();
    const id: number = Number(request.id);
    const btn = document.querySelector('.btn_L') as HTMLElement;
    const cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === id);
    if (existItem) {
      btn.textContent = 'DROP FROM CART';
      btn.classList.add('btn_primary_disabled');
    } else {
      btn.textContent = 'ADD TO CART';
      btn.classList.remove('btn_primary_disabled');
    }
    btn.addEventListener('click', () => {
      const product = products[id - 1];
      const cartItems = getCartItems();
      const existItem = cartItems.find((x) => x.product === id);
      console.log(product, cartItems, existItem, id);
      if (existItem) {
        btn.textContent = 'ADD TO CART';
        btn.classList.remove('btn_primary_disabled');
        homeScreen.removeFromCart(existItem.product);
      } else {
        homeScreen.addToCart({
          product: product.id,
          title: product.title,
          image: product.thumbnail,
          price: product.price,
          category: product.category,
          stock: product.stock,
          qty: 1,
        });
        btn.textContent = 'DROP FROM CART';
        btn.classList.add('btn_primary_disabled');
      }
    });

    const thumbSwiper: Swiper = new Swiper('.thumbs .swiper-container', {
      direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 24,
      slideToClickedSlide: true,
      breakpoints: {
        320: {
          direction: 'horizontal',
          spaceBetween: 12,
        },
        992: { direction: 'vertical', spaceBetween: 20 },
      },
    });

    const thumbs = document.querySelectorAll('.thumbs .swiper-slide') as NodeListOf<HTMLDivElement>;
    const mySwiper: Swiper = new Swiper('.product-page__slider-wrapper .swiper-container', {
      thumbs: {
        swiper: thumbSwiper,
      },
      on: {
        slideChange: function (): void {
          thumbs.forEach((el) => {
            el.classList.remove('thumbs-active');
          });
          const activeIndex: number = mySwiper.activeIndex;
          thumbs[activeIndex].classList.add('thumbs-active');
        },
      },
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 32,
      allowTouchMove: false,

      breakpoints: {
        320: {
          direction: 'horizontal',
          allowTouchMove: true,
          spaceBetween: 5,
        },
        992: {
          direction: 'vertical',
          allowTouchMove: false,
          spaceBetween: 20,
        },
      },
    });

    thumbs.forEach((element) => {
      element.addEventListener('click', () => {
        thumbs.forEach((el) => {
          el.classList.remove('thumbs-active');
        });

        element.classList.add('thumbs-active');
        let swiperGetData: string | null = element.getAttribute('data-slide');
        mySwiper.slideTo(Number(swiperGetData), 500);
      });
    });
  }

  public render(): string {
    const request: Route = parseRequestUrl();
    const id: number = Number(request.id) - 1;

    return `
    <div class="page__container container">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a href="/#/" class="font_M breadcrumbs__link">Catalog</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="" class="font_M breadcrumbs__link breadcrumbs__link-disabled">${products[id].category}</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="" class="font_M breadcrumbs__link breadcrumbs__link-disabled">${products[id].brand}</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="" class="font_M breadcrumbs__link breadcrumbs__link-disabled">${products[id].title}</a>
          </li>
        </ul>
        <div class="product-page">
          <div class="product-page__slider">
            <div class="product-page__thumbs-wrapper">
            <div class="thumbs">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  ${products[id].images
                    .map((item, index) =>
                      index === 0
                        ? `
                      <div class="swiper-slide thumbs-active" data-slide='${index}'>
                          <div class="thumbs__item">
                            <img
                              src="${item}"
                              alt="${products[id].title}">
                          </div>
                        </div>`
                        : `
                        <div class="swiper-slide" data-slide='${index}'>
                          <div class="thumbs__item">
                            <img
                              src="${item}"
                              alt="${products[id].title}">
                          </div>
                        </div>
                        `
                    )
                    .join('\n')}
                </div>
              </div>
              </div>
            </div>
            <div class="product-page__slider-wrapper">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  ${products[id].images
                    .map(
                      (item, index) =>
                        `
                     <div class="swiper-slide" data-slide='${index}'>
                      <div class="product-page__img">
                        <img
                          src="${item}"
                          alt="${products[id].title}">
                      </div>
                    </div>
                    `
                    )
                    .join('\n')}
                </div>
              </div>
            </div>
          </div>
          <div class="product-page__card">
            <div class="font_M product-page__name">
              ${products[id].title}
            </div>
            <div class="product-page__order product-order">
              <div class="font_S product-order__price">
                ${products[id].price} ₽
              </div>
              <div class="product-order__actions">
                <button class="btn btn_primary btn_L product-order__add-cart">Add to cart</button>
                <button class="btn btn_outline btn_L product-order__one-click">One-click
                  order</button>
              </div>
            </div>
            <ul class="product-page__menu product-menu">
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">Brand:</span>
                  <span class="font_XS">${products[id].brand}</span>
                </div>
              </li>
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">Category:</span>
                  <span class="font_XS">${products[id].category}</span>
                </div>
              </li>
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">In stock:</span>
                  <span class="font_XS">${products[id].stock}</span>
                </div>
              </li>
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">Description:</span>
                  <div class="font_XS">${products[id].description}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

export default ProductScreen;
