import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   const root = createRoot(div);
//   const queryClient = new QueryClient();

//   jest.mock('@sentry/react');
//   jest.mock('@auth0/auth0-react');

//   act(() => root.render(
//     <Auth0Provider
//       domain="test"
//       clientId="test"
//     >
//       <Router>
//         <QueryClientProvider client={queryClient}>
//           <App />
//         </QueryClientProvider>
//       </Router>
//     </Auth0Provider>
//     ,
//   ));
// });
