import data from './constans/data';
const { products } = data;

const a = document.querySelector('.aaa') as HTMLElement;

a.innerHTML = `<img src=${products[0].thumbnail}/>`;
