import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import configureFetch from 'api';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './index.scss';

if (process.env.NODE_ENV === 'development') {
  configureFetch();

  fetch('anime/year/2021/season/Winter?page=1&includeMeta=true')
    .then((response) => response.json())
    .then((data) => console.log(data));
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
