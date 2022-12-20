import { CartProduct } from './types/interfaces';

export const getCartItems = (): CartProduct[] => {
  const cartItems: unknown = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '{}')
    : [];
  return cartItems as CartProduct[];
};
export const setCartItems = (cartItems: CartProduct[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
