const realFetch = window.fetch;

const configureFetch = (): void => {
  window.fetch = fetchAbsolute;
};

const fetchAbsolute = async (input: RequestInfo, init?: RequestInit) => {
  const route = input.toString();

  let response;
  if (route.startsWith('http') || route.startsWith('/')) {
    response = await realFetch(route, init);
  } else {
    response = await realFetch(`${process.env.REACT_APP_API}/${route}`, init);
  } 

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export default configureFetch;
