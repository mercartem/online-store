import products from '../../../constans/data';

import { Screen } from '../../../constans/types/interfaces';

class HomeScreen implements Screen {
  render() {
    return `
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
          <button class="btn btn_M btn_primary">ADD TO CART</button>
          <div class="product__stock font_XXS">In stock: ${product.stock}</div>
        </div>
      </li>
      `
        )
        .join('\n')}
    </ul>
    `;
  }
}

export default HomeScreen;
