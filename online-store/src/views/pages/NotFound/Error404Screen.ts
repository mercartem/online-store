import { Screen } from '../../../constans/types/interfaces';

class Error404Screen implements Screen {
  public afterRender(): void {
    (document.querySelector('.error__btn') as HTMLDivElement).addEventListener('click', () => {
      console.log('click');
      document.location.hash = `/`;
    });
  }

  public render(): string {
    return `
    <div class="page__container main__container container">
      <div class="error">
        <div class="error__info">
          <h1 class="error__title font_XXL">Error 404!<br>Something went wrong...</h1>
          <h5 class="error__text font_S">This page does not exist. Go back to the catalog.</h5>
          <button class="btn btn_L btn_primary error__btn">Go to catalog</button>
        </div>
      <div>
    </div>`;
  }
}

const error404Screen = new Error404Screen();
export default error404Screen;
