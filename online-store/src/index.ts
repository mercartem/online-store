import './scss/app.scss';
import { Route, Screen } from './constans/types/interfaces';
import { parseRequestUrl } from './constans/utils';
import homeScreen from './views/pages/Main/HomeScreen';
import ProductScreen from './views/pages/Product/ProductScreen';
import error404Screen from './views/pages/NotFound/Error404Screen';
import cartScreen from './views/pages/Cart/CartScreen';
import filter from './views/components/FiltersBlock/Filters';

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
  const screen: Screen = routes[parseUrl] ?? error404Screen;
  const main = document.querySelector('.page') as HTMLElement;

  main.innerHTML = screen.render();

  if (screen.afterRender) {
    screen.afterRender();
  }

  const catalogHeader = document.querySelector('.menu-nav__link') as HTMLElement;
  const catalogFooter = document.querySelector('.menu-footer__link') as HTMLElement;
  catalogHeader.addEventListener('click', () => {
    filter.resetFilters();
  });
  catalogFooter.addEventListener('click', () => {
    filter.resetFilters();
  });
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
