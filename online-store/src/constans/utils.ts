import { Route, Screen } from './types/interfaces';

export const parseRequestUrl = (): Route => {
  const address = document.location.hash.slice(1).split('?')[0];
  const queryString =
    document.location.hash.slice(1).split('?').length === 2 ? document.location.hash.slice(1).split('?')[1] : '';
  const url = address.toLowerCase() || '/';
  const r = url.split('/');
  const queryParams: { [key: string]: string } = {};
  if (queryString) {
    const queries = queryString.split('&');
    queries.forEach((query) => {
      const [name, value] = query.split('=');
      queryParams[name] = value;
    });
  }
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
    queryParams,
  };
};

export const rerender = (component: Screen): void => {
  const main = document.querySelector('.page') as HTMLElement;
  main.innerHTML = component.render();
  if (component.afterRender) {
    component.afterRender();
  }
};
