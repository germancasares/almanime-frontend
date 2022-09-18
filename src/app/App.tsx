import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import Footer from 'app/footer';
import Header from 'app/header';
import routes from 'app/routes';
import Theme from 'enums/Theme';

import Helper from './helper';

import './index.scss';

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
      <Routes>
        {
          Object.values(routes).map((route) => Object.values(route).map(({
            path,
            component: Component,
            hideHeader,
            hideFooter,
          }) => (
            <Route
              key={path}
              path={path}
              element={(
                <>
                  {!hideHeader && <Header theme={theme} toggleTheme={toggleTheme} />}
                  <Component />
                  {!hideFooter && <Footer />}
                </>
              )}
            />
          )))
        }
      </Routes>
    </div>
  );
};

export default Sentry.withProfiler(App);
