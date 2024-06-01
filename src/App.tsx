import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Theme from './enums/Theme';
import Helper from './helper';
import Footer from './pages/footer';
import Header from './pages/header';
import routes from './pages/routes';

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

const AppWithSentry = Sentry.withProfiler(App);

export default AppWithSentry;
