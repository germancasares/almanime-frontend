const realFetch = window.fetch;

const configureFetch = (): void => {
  window.fetch = fetchAbsolute;
};

const fetchAbsolute = async (input: RequestInfo | URL, init?: RequestInit) => {
  let response;

  const route = input.toString();
  if (input instanceof Request) {
    response = await realFetch(input, init);
  } else if (route.startsWith('http') || route.startsWith('/')) {
    response = await realFetch(route, init);
  } else {
    response = await realFetch(`${process.env.REACT_APP_API}/${route}`, init);
  }

  if (!response.ok) {
    throw new Error(`Network response: ${response.statusText}`);
  }

  return response;
};

export default configureFetch;
