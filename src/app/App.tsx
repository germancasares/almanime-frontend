import { useState } from 'react';
import { Route } from 'react-router-dom';
import routes from 'app/routes';
import Theme from 'enums/Theme';
import Header from 'app/header';
import Footer from 'app/footer';
import Helper from './helper';
import './index.scss';

const App = (): JSX.Element => {
  const localTheme = Helper.LocalStorage.Get<Theme>('theme');
  const [theme, setTheme] = useState(localTheme ?? Theme.Light);
  Helper.LocalStorage.Create('theme', theme);

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;

    setTheme(newTheme);
    Helper.LocalStorage.Create('theme', newTheme);
  };

  return (
    <div className={`theme-${theme}`}>
      <div id="app">
        <Header theme={theme} toggleTheme={toggleTheme} />

        {Object.values(routes).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact
          >
            <route.component />
          </Route>
        ))}

        <Footer />
      </div>
    </div>
  );
};

export default App;
