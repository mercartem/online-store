import './scss/app.scss';
import HomeScreen from './views/pages/Main/HomeScreen';

const router = () => {
  const main = document.querySelector('.main-container') as HTMLElement;
  const homeScreen: HomeScreen = new HomeScreen();
  main.innerHTML = homeScreen.render();
};

window.addEventListener('load', router);
