import { Screen } from '../../../constans/types/interfaces';
import products from '../../../constans/data';

class ProductScreen implements Screen {
  render() {
    return `
    <div class="page__container container">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a href="/#/" class="font_M breadcrumbs__link">Catalog</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="" class="font_M breadcrumbs__link breadcrumbs__link-disabled">${products[0].category}</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="" class="font_M breadcrumbs__link breadcrumbs__link-disabled">${products[0].brand}</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="" class="font_M breadcrumbs__link breadcrumbs__link-disabled">${products[0].title}</a>
          </li>
        </ul>
        <div class="product-page">
          <div class="product-page__slider">
            <div class="product-page__slider-thumbs">
              <ul class="thumbs-menu">
                <li class="thumbs-menu__item thumbs-menu__item-active">
                  <div>
                    <img
                      src="${products[0].images[0]}"
                      alt="${products[0].title}">
                  </div>
                </li>
                <li class="thumbs-menu__item">
                  <div>
                    <img
                      src="${products[0].images[1]}"
                      alt="${products[0].title}">
                  </div>
                </li>
                <li class="thumbs-menu__item">
                  <div>
                    <img
                      src="${products[0].images[2]}"
                      alt="${products[0].title}">
                  </div>
                </li>
                <li class="thumbs-menu__item">
                  <div>
                    <img
                      src="${products[0].images[3]}"
                      alt="${products[0].title}">
                  </div>
                </li>
              </ul>
            </div>
            <div class="product-page__slider-wrap">
              <div class="product-page__img">
                <img
                  src="${products[0].thumbnail}"
                  alt="${products[0].title}">
              </div>
            </div>
          </div>
          <div class="product-page__card">
            <div class="font_M product-page__name">
              ${products[0].title}
            </div>
            <div class="product-page__order product-order">
              <div class="font_S product-order__price">
                ${products[0].price} ₽
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
                  <span class="font_XS">${products[0].brand}</span>
                </div>
              </li>
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">Category:</span>
                  <span class="font_XS">${products[0].category}</span>
                </div>
              </li>
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">In stock:</span>
                  <span class="font_XS">${products[0].stock}</span>
                </div>
              </li>
              <li class="product-menu__item">
                <div class="product-menu__title">
                  <span class="font_XS">Description:</span>
                  <div class="font_XS">${products[0].description}</div>
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
