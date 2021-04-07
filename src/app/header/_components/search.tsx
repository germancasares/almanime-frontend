import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import './search.scss';

const Search = (): JSX.Element => (
  <div className="navbar-item search">
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
            <input type="text" className="input" placeholder="Search for..." />
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
        <Link to="/" className="button px-2">
          <Icon
            path={mdiMagnify}
            size={1}
          />
        </Link>
      </div>
    </div>
  </div>
);

export default Search;
