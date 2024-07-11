import { Auth0Provider } from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import { Duration } from "luxon";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { ReactQueryDevtools } from "react-query/devtools";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import configureFetch from "./api/index.ts";
import "./main.scss";
import routes from "./pages/routes.ts";
import reportWebVitals from "./reportWebVitals";

const {
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  ENVIRONMENT,
  IS_DEVELOPMENT,
  RELEASE,
  SENTRY_DSN,
  SHOULD_PERSIST_QUERIES,
} = await import("./settings");

Sentry.init({
  enabled: !IS_DEVELOPMENT,
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,
  release: RELEASE,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Duration.fromObject({ days: 1 }).toMillis(),
      refetchOnWindowFocus: !IS_DEVELOPMENT,
    },
  },
});

if (SHOULD_PERSIST_QUERIES) {
  const persistor = createWebStoragePersistor({ storage: window.localStorage });
  persistQueryClient({
    queryClient,
    persistor,
  });
}

configureFetch();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      useRefreshTokens
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: `${window.location.origin}${routes.user.create.path}`,
        audience: AUTH0_AUDIENCE,
        scope: "profile email read:current_user update:current_user_metadata",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
