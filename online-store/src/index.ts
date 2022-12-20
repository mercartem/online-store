import './scss/app.scss';

import { Route, Screen } from './constans/types/interfaces';
import { parseRequestUrl } from './constans/utils';
import HomeScreen from './views/pages/Main/HomeScreen';
import ProductScreen from './views/pages/Product/ProductScreen';
import Error404Screen from './views/pages/NotFound/Error404Screen';
import CartScreen from './views/pages/Cart/CartScreen';

const homeScreen: HomeScreen = new HomeScreen();
const productScreen: ProductScreen = new ProductScreen();
const error404Screen: Error404Screen = new Error404Screen();
const cartScreen: CartScreen = new CartScreen();

const routes: Record<string, Screen> = {
  '/': homeScreen,
  'product/:id': productScreen,
  'cart/:id': cartScreen,
  cart: cartScreen,
};

const router = (): void => {
  const request: Route = parseRequestUrl();
  const parseUrl: string =
    (request.resource ? `${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen: Screen = routes[parseUrl] ? routes[parseUrl] : error404Screen;
  const main = document.querySelector('.page') as HTMLElement;
  main.innerHTML = screen.render();
  if (screen.afterRender) {
    screen.afterRender();
  }
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
