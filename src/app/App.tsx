import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import routes from 'app/routes';
import Theme from 'enums/Theme';
import Header from 'app/header';
import './index.scss';

const App = (): JSX.Element => {
  const [theme, setTheme] = useState(Theme.Light);
  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return (
    <Router>
      <div className={`theme-${theme}`}>
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
      </div>
    </Router>
  );
};

export default App;
