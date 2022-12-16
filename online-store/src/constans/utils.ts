import { Route } from './types/interfaces';

export const parseRequestUrl = (): Route => {
  const url: string = document.location.hash.toLowerCase();
  const request: string[] = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};
