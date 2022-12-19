import './scss/app.scss';

import { Screen } from './constans/types/interfaces';
import { parseRequestUrl } from './constans/utils';
import HomeScreen from './views/pages/Main/HomeScreen';
import ProductScreen from './views/pages/Product/ProductScreen';
import Error404Screen from './views/pages/NotFound/Error404Screen';

const homeScreen: HomeScreen = new HomeScreen();
const productScreen: ProductScreen = new ProductScreen();
const error404Screen: Error404Screen = new Error404Screen();

const routes: Record<string, Screen> = {
  '/': homeScreen,
  'product/:id': productScreen,
};

const router = () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : error404Screen;
  const main = document.querySelector('.page') as HTMLElement;
  main.innerHTML = screen.render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
