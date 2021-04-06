import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import Brand from './_components/brand';

const Header = (): JSX.Element => {
  const algo = 'Algo';

  return (
    <>
      <nav className="navbar is-fixed-top">
        <div className="container">
          <Brand />

          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">Home</Link>
              <Link className="navbar-item" to="/">Anime</Link>
              <Link className="navbar-item" to="/">Fansub</Link>
              <Link className="navbar-item" to="/">Users</Link>
            </div>
          </div>

          <div className="navbar">
            <div className="navbar-item">
              <div className="field has-addons">
                <div className="control">
                  <span className="select">
                    <select>
                      <option>Anime</option>
                      <option>Fansub</option>
                      <option>User</option>
                    </select>
                  </span>
                </div>

                <div className="control">
                  <div className="dropdown">
                    <div className="dropdown-trigger">
                      <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Search for...</span>
                      </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        <Link to="/" className="dropdown-item">Item 1</Link>
                        <Link to="/" className="dropdown-item">Item 2</Link>
                        <Link to="/" className="dropdown-item">Item 3</Link>
                        <Link to="/" className="dropdown-item">Item 4</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="control">
                  <Link to="/" className="button">
                    <Icon
                      path={mdiMagnify}
                      size={1}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
