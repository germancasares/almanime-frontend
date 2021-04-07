import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import routes from 'app/routes';
import ConfigurationWrapper from 'contexts';
import { Theme } from 'enums';
import Header from 'app/header/Header';

const App = (): JSX.Element => {
  const [theme, setTheme] = useState(Theme.Light);
  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return (
    <ConfigurationWrapper>
      <Router>
        <div className={`theme-${theme}`}>
          <Header theme={theme} toggleTheme={toggleTheme} />

          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact
            >
              <route.component />
            </Route>
          ))}
        </div>
      </Router>
    </ConfigurationWrapper>
  );
};

export default App;
