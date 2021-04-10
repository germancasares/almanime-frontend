import AnimeApi from './AnimeApi';
import { sleep } from './_helper';

const mocks = [
  ...AnimeApi.Mocks,
];

const configureFetch = (): void => {
  const realFetch = window.fetch;

  window.fetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const route = input.toString();
    const method = init?.method || 'GET';

    const mock = mocks.find((e) => e.method === method && e.regex.test(route));

    await sleep(500);

    if (mock) {
      return mock.response;
    }

    return realFetch(input, init);
  };
};

export default configureFetch;
