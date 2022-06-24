import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mdiMagnify } from '@mdi/js';
import { Icon } from '@mdi/react';

import AnimeApi from 'api/AnimeApi';
import FansubApi from 'api/FansubApi';
import Helper from 'app/helper';
import routes from 'app/routes';
import { AnimeDocument } from 'types/anime';
import { FansubDocument } from 'types/fansub';

import './search.scss';

const Search = () => {
  const [type, setType] = useState('Anime');
  const [query, setQuery] = useState('');
  const debouncedSearchQuery = Helper.useDebounce(query, 600);

  let documents: AnimeDocument[] | FansubDocument[] = [];
  let isLoading = false;

  let animeSearch;
  let fansubSearch;
  switch (type) {
    case 'Anime':
      animeSearch = AnimeApi.Search(debouncedSearchQuery.trim());
      documents = animeSearch.data ?? [];
      isLoading = animeSearch.isLoading;
      break;
    case 'Fansub':
      fansubSearch = FansubApi.Search(debouncedSearchQuery.trim());
      documents = fansubSearch.data ?? [];
      isLoading = fansubSearch.isLoading;
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
