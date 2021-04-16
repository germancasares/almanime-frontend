import { pathToRegexp } from 'path-to-regexp';
import AnimeApi from './AnimeApi';
import SearchApi from './SearchApi';
import { sleep } from './_helper';

const mocks = [
  ...AnimeApi.Mocks,
  ...SearchApi.Mocks,
];

const configureFetch = (): void => {
  const realFetch = window.fetch;

  window.fetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const route = input.toString().split(/[?#]/)[0];
    const method = init?.method || 'GET';

    const mock = mocks.find((e) => e.method === method && pathToRegexp(e.path).test(route));

    await sleep(500);

    return mock ? mock.response.clone() : realFetch(input, init);
  };
};

export default configureFetch;
