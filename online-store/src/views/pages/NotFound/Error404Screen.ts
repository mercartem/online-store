import { Screen } from '../../../constans/types/interfaces';

class Error404Screen implements Screen {
  afterRender() {
    // Переход в каталог при клике на кнопку
    const buttonError = document.querySelector('.error__btn') as HTMLButtonElement;
    buttonError.addEventListener('click', () => {
      document.location.hash = `/`;
    });
  }

  render() {
    return `
    <div class="page__container main__container container">
      <div class="error">
        <div class="error__info">
          <h1 class="error__title font_XXL">Error 404!<br>Something went wrong...</h1>
          <h5 class="error__text font_S">This page does not exist. Go back to the catalog.</h5>
          <button class="error__btn btn btn_L btn_primary">Go to catalog</button>
        </div>
      <div>
    </div>`;
  }
}

const error404Screen = new Error404Screen();
export default error404Screen;
