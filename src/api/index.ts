import { API } from "../settings";

const realFetch = window.fetch;

const fetchAbsolute = async (input: RequestInfo | URL, init?: RequestInit) => {
  let response;

  const route = input.toString();
  if (input instanceof Request) {
    response = await realFetch(input, init);
  } else if (route.startsWith('http') || route.startsWith('/') || route.startsWith('blob:')) {
    response = await realFetch(route, init);
  } else {
    response = await realFetch(`${API}/${route}`, init);
  }

  if (!response.ok) {
    throw new Error(`Network response: ${response.statusText}`);
  }

  return response;
};

const configureFetch = (): void => {
  window.fetch = fetchAbsolute;
};

export default configureFetch;
