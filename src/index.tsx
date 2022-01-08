import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Auth0Provider } from '@auth0/auth0-react';

import configureFetch from 'api';
import reducer from 'app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

configureFetch();

const store = configureStore({
  reducer,
});

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain="almanime.us.auth0.com"
      clientId="kofffbDvo0gJ9BW1U9Hj7UNsrJuMAO9Y"
      redirectUri={window.location.origin}
      audience="https://almani.me"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      scope="read:current_user update:current_user_metadata"
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
