import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { ReactQueryDevtools } from 'react-query/devtools';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Duration } from 'luxon';

import configureFetch from 'api';
import routes from 'app/routes';

import App from './app/App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

Sentry.init({
  enabled: process.env.NODE_ENV !== 'development',
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.REACT_APP_RELEASE,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Duration.fromObject({ days: 1 }).toMillis(),
      refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
    },
  },
});

if (process.env.REACT_APP_SHOULD_PERSIST_QUERIES !== 'false') {
  const persistor = createWebStoragePersistor({ storage: window.localStorage });
  persistQueryClient({
    queryClient,
    persistor,
  });
}

configureFetch();

createRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!,
).render(
  <StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
      useRefreshTokens
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: `${window.location.origin}${routes.user.create.path}`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'profile email read:current_user update:current_user_metadata',
      }}
    >
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </Auth0Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
