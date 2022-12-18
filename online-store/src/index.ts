import './scss/app.scss';

// import HomeScreen from './views/pages/Main/HomeScreen';
import ProductScreen from './views/pages/Product/ProductScreen';

const router = () => {
  const main = document.querySelector('.page') as HTMLElement;
  // const homeScreen: HomeScreen = new HomeScreen();
  // main.innerHTML = homeScreen.render();
  const productScreen: ProductScreen = new ProductScreen();
  main.innerHTML = productScreen.render();
};

window.addEventListener('load', router);
