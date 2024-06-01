import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mdiMagnify } from '@mdi/js';
import { Icon } from '@mdi/react';
import './search.scss';
import Helper from '../../../helper';
import AnimeApi from '../../../api/AnimeApi';
import FansubApi from '../../../api/FansubApi';
import UserApi from '../../../api/UserApi';
import { AnimeDocument } from '../../../types/anime';
import { FansubDocument } from '../../../types/fansub';
import { UserDocument } from '../../../types/user';
import routes from '../../routes';

const Search = () => {
  const [type, setType] = useState('Anime');
  const [query, setQuery] = useState('');
  const debouncedSearchQuery = Helper.useDebounce(query, 600).trim();

  const animeSearch = AnimeApi.Search(type === 'Anime' ? debouncedSearchQuery : undefined);
  const fansubSearch = FansubApi.Search(type === 'Fansub' ? debouncedSearchQuery : undefined);
  const userSearch = UserApi.Search(type === 'User' ? debouncedSearchQuery : undefined);

  let isLoading = false;
  let documents: AnimeDocument[] | FansubDocument[] | UserDocument[] = [];
  switch (type) {
    case 'Anime':
      isLoading = animeSearch.isLoading;
      documents = animeSearch.data ?? [];
      break;
    case 'Fansub':
      isLoading = fansubSearch.isLoading;
      documents = fansubSearch.data ?? [];
      break;
    case 'User':
      isLoading = userSearch.isLoading;
      documents = userSearch.data ?? [];
      break;
    default:
      break;
  }

  return (
    <div className="navbar-item search">
      <div className="field has-addons">
        <div className="control">
          <span className="select">
            <select onChange={({ target: { value } }) => setType(value)}>
              <option>Anime</option>
              <option>Fansub</option>
              <option>User</option>
            </select>
          </span>
        </div>

        <div className="control">
          <div className={`dropdown${(documents?.length ?? 0) > 0 ? ' is-active' : ''}`}>
            <div className="dropdown-trigger">
              <input
                type="text"
                value={query}
                className="input"
                placeholder="Search for..."
                onChange={({ target: { value } }) => setQuery(value)}
              />
            </div>
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {
                  documents && documents.map((doc) => (
                    <Link
                      key={doc.id}
                      to={
                        type === 'Anime'
                          ? routes.anime.view.to((doc as AnimeDocument).slug)
                          : routes.fansub.view.to((doc as FansubDocument).acronym)
                      }
                      className="dropdown-item"
                      onClick={() => setQuery('')}
                    >
                      {doc.name}
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="control">
          <button type="button" className={`button px-2${isLoading ? ' is-loading' : ''}`}>
            <Icon
              path={mdiMagnify}
              size={1}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
