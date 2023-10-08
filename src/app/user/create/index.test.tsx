import { ComponentType, ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from '@testing-library/react';

import UserApi from 'api/UserApi';

import Create from '.';

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: ReactElement }) => children,
  withAuthenticationRequired: ((component: ComponentType<object>) => component),
  useAuth0: () => ({
    isLoading: false,
    user: { sub: 'foobar' },
    isAuthenticated: true,
    loginWithRedirect: jest.fn(),
    getIdTokenClaims: jest.fn().mockReturnValue({ nickname: 'test' }),
  }),
}));

jest.mock('api/UserApi');

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  const queryClient = new QueryClient();
  const mockCreate = jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({ isNew: true }),
    isLoading: false,
  });

  UserApi.Create = mockCreate;

  act(() => root.render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Create accessToken="test" />
      </QueryClientProvider>
    </Router>,
  ));
});
