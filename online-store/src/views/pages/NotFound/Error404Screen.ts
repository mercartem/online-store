import { Screen } from '../../../constans/types/interfaces';
import { error } from '../../../constans/images';

class Error404Screen implements Screen {
  render() {
    return `
    <div class="error">
      <div class="error__info">
        <h1 class="error__title font_XXL">Something went wrong...</h1>
        <h5 class="error__text font_S">This page does not exist. Go back to the catalog.</h5>
        <button class="btn btn_L btn_primary">Go to catalog</button>
      </div>
      <img src="${error}" alt="Error"/>
    <div>`;
  }
}

export default Error404Screen;
