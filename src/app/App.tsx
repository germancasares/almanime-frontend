import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import routes from 'app/routes';
import Theme from 'enums/Theme';
import Header from 'app/header';
import Footer from 'app/footer';
import Helper from './helper';
import './index.scss';

// https://reactrouter.com/docs/en/v6/api#useroutes
// https://reactrouter.com/docs/en/v6/getting-started/concepts#defining-routes

const App = () => {
  const localTheme = Helper.LocalStorage.Get<Theme>('theme');
  const [theme, setTheme] = useState(localTheme ?? Theme.Light);
  Helper.LocalStorage.Create('theme', theme);

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;

    setTheme(newTheme);
    Helper.LocalStorage.Create('theme', newTheme);
  };

  return (
    <div id="app" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        {
          Object.values(routes).map((pages) => Object.values(pages).map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          )))
        }
      </Routes>

      <Footer />
    </div>
  );
};

export default Sentry.withProfiler(App);
