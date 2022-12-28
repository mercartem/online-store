import './scss/app.scss';

import { Route, Screen } from './constans/types/interfaces';
import { parseRequestUrl } from './constans/utils';
import homeScreen from './views/pages/Main/HomeScreen';
import ProductScreen from './views/pages/Product/ProductScreen';

import error404Screen from './views/pages/NotFound/Error404Screen';
import cartScreen from './views/pages/Cart/CartScreen';

const productScreen: ProductScreen = new ProductScreen();

const routes: Record<string, Screen> = {
  '/': homeScreen,
  'product/:id': productScreen,
  'cart/:id': cartScreen,
  cart: cartScreen,
};

const router = (): void => {
  window.scrollTo(0, 0);
  const request: Route = parseRequestUrl();
  const parseUrl: string =
    (request.resource ? `${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  console.log(parseUrl, request);
  const screen: Screen = routes[parseUrl] ? routes[parseUrl] : error404Screen;
  const main = document.querySelector('.page') as HTMLElement;
  main.innerHTML = screen.render();
  if (screen.afterRender) {
    screen.afterRender();
  }
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
