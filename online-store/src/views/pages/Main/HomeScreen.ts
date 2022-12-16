import products from '../../../constans/data';

class HomeScreen {
  render() {
    return `
    <ul class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product">
          <div class="product__name font_S">
            <a href="/#/product/${product.id}">${product.title}</a>
          </div>
          <a href="/#/product/${product.id}">
            <img src="${product.thumbnail}" alt="${product.title}" />
          </a>
          <div class="product__price font_M">${product.price} ₽</div>
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
