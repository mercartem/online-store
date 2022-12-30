import { getCartItems, setCartItems } from '../constans/localStorage';
import homeScreen from '../views/pages/Main/HomeScreen';

describe('removeFromCart', () => {
  it('remove the item with the specified id from the cart', () => {
    const id = 1;
    const cart = [
      {
        product: 1,
        title: 'Ball FC Dynamo',
        image: '../assets/img/products-1-1.png',
        price: 2790,
        category: 'balls',
        stock: 25,
        qty: 1,
      },
      {
        product: 2,
        title: 'Diary FC Dynamo',
        image: '../assets/img/products-2-1.png',
        price: 1190,
        category: 'souvenirs',
        stock: 9,
        qty: 1,
      },
    ];
    setCartItems(cart);

    homeScreen.removeFromCart(id);

    expect(getCartItems()).toEqual([
      {
        product: 2,
        title: 'Diary FC Dynamo',
        image: '../assets/img/products-2-1.png',
        price: 1190,
        category: 'souvenirs',
        stock: 9,
        qty: 1,
      },
    ]);
  });
});
