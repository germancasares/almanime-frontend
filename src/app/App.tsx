import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import routes from 'app/routes';
import ConfigurationWrapper from 'contexts';
import { Theme } from 'enums';
import Header from 'app/header/Header';

const App = (): JSX.Element => {
  const [theme] = useState(Theme.Light);

  return (
    <ConfigurationWrapper>
      <Router>
        <Header />
        <div className={`theme-${theme}`}>
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
