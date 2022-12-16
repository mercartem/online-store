import { Screen } from '../../../constans/types/interfaces';

class Error404Screen implements Screen {
  render() {
    return `
    <div class="error">
      <div class="error__info">
        <h1 class="error__title font_XXL">Error 404!<br>Something went wrong...</h1>
        <h5 class="error__text font_S">This page does not exist. Go back to the catalog.</h5>
        <button class="btn btn_L btn_primary" href="/#/">Go to catalog</button>
      </div>
    <div>`;
  }
}

export default Error404Screen;
