import { ReactElement, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react';

const client = new QueryClient();

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: ReactElement }) => children,
  withAuthenticationRequired: ({ children }: { children: ReactElement }) => children,
}));

const AllTheProviders = ({ children }: { children: ReactElement }) => (
  <StrictMode>
    <Auth0Provider
      domain="test-domain"
      clientId="test-clientId"
    >
      <Router>
        <QueryClientProvider client={client}>
          {children}
        </QueryClientProvider>
      </Router>
    </Auth0Provider>
  </StrictMode>
);

const customRender = (
  ui: ReactElement,
  options?: RenderOptions,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

// override render method
export { customRender as render };
