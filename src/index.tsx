import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { ReactQueryDevtools } from 'react-query/devtools';

import configureFetch from 'api';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import { Duration } from 'luxon';
import routes from 'app/routes';

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

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain="almanime.us.auth0.com"
      clientId="kofffbDvo0gJ9BW1U9Hj7UNsrJuMAO9Y"
      redirectUri={`${window.location.origin}${routes.user.create.path}`}
      audience="https://almani.me"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      scope="read:current_user update:current_user_metadata"
    >
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
