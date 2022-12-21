import { Route, Screen } from './types/interfaces';

export const parseRequestUrl = (): Route => {
  const address = document.location.hash.slice(1).split('?')[0];
  const queryString =
    document.location.hash.slice(1).split('?').length === 2 ? document.location.hash.slice(1).split('?')[1] : '';
  const url = address.toLowerCase() || '/';
  const r = url.split('/');
  const q = queryString.split('=');
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
    name: q[0],
    value: q[1],
  };
};

export const rerender = (component: Screen): void => {
  const main = document.querySelector('.page') as HTMLElement;
  main.innerHTML = component.render();
  if (component.afterRender) {
    component.afterRender();
  }
};
