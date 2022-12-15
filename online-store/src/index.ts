import products from './constans/data';

const a = document.querySelector('.aaa') as HTMLElement;

a.innerHTML = `<img src=${products[5].thumbnail}/><div>${products[5].title}</div>`;
