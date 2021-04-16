import { pathToRegexp } from 'path-to-regexp';
import AnimeApi from './AnimeApi';
import SearchApi from './SearchApi';
import { sleep } from './_helper';

const mocks = [
  ...AnimeApi.Mocks,
  ...SearchApi.Mocks,
];

const realFetch = window.fetch;

const configureFetch = (): void => {
  window.fetch = process.env.REACT_APP_MOCK_FETCH === 'true' ? fetchMock : fetchAbsolute;
};

const fetchMock = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const route = input.toString().split(/[?#]/)[0];
  const method = init?.method || 'GET';

  // TODO: import { matchPath } from "react-router";
  const mock = mocks.find((e) => e.method === method && pathToRegexp(e.path).test(route));

  await sleep(500);

  return mock ? mock.response.clone() : realFetch(input, init);
};

const fetchAbsolute = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const route = input.toString();

  const path = route.startsWith('/') ? route : `${process.env.REACT_APP_API}/${route}`;

  return realFetch(path, init);
};

export default configureFetch;
