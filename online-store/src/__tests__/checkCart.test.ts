import homeScreen from '../views/pages/Main/HomeScreen';

test('productInCart updates button text and class based on whether product is in cart', () => {
  const btns = document.createElement('div');
  btns.innerHTML = `<button id="123"></button><button id="456"></button>`;
  const getCartItems = jest.fn().mockReturnValue([{ product: 123 }]);

  homeScreen.productInCart(btns.children, 0);
  expect(btns.children[0].textContent).toBe('ADD TO CART');
  expect(btns.children[0].classList).not.toContain('btn_primary_disabled');
});
