import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { match } from 'path-to-regexp';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

import { Location } from 'history';

import routes from 'app/routes';
import Helper from 'app/helper';
import SearchApi from 'api/SearchApi';
import { AnimeIndex } from 'types/anime';

import './search.scss';

const search = async (
  type: string,
  query: string,
  location: Location<Record<string, never>>,
): Promise<AnimeIndex[]> => {
  if (query.trim() === '') return [];

  let docs;
  switch (type) {
    case 'Anime':
      docs = await SearchApi.Anime(query.trim());

      // eslint-disable-next-line no-case-declarations
      const matchResult = match(routes.anime.path, { decode: decodeURIComponent })(location.pathname);
      if (matchResult) {
        const { slug } = matchResult.params as { slug: string };
        docs = docs.filter((r) => r.slug !== slug);
      }

      return docs;
    default:
      break;
  }

  return [];
};

const Search = (): JSX.Element => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState<AnimeIndex[]>([]);
  const [type, setType] = useState('Anime');
  const [inFlight, setInFlight] = useState(false);

  useEffect(() => {
    setInFlight(true);

    (async () => {
      setDocuments(await search(type, query, location));
      setInFlight(false);
    })();
  }, [query, type, location]);

  const clearSearch = () => {
    setQuery('');
    setDocuments([]);
  };

  return (
    <div className="navbar-item search">
      <div className="field has-addons">
        <div className="control">
          <span className="select">
            <select onChange={(event) => setType(Helper.Event.GetValue(event))}>
              <option>Anime</option>
              <option>Fansub</option>
              <option>User</option>
            </select>
          </span>
        </div>

        <div className="control">
          <div className={`dropdown${documents.length > 0 ? ' is-active' : ''}`}>
            <div className="dropdown-trigger">
              <input
                type="text"
                value={query}
                className="input"
                placeholder="Search for..."
                onChange={(event) => setQuery(Helper.Event.GetValue(event))}
                onBlur={clearSearch}
              />
            </div>
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {
                  documents.map((doc) => (
                    <Link
                      key={doc.kitsuID}
                      to={routes.anime.to(doc.slug)}
                      className="dropdown-item"
                      onClick={clearSearch}
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
          <button type="button" className={`button px-2${inFlight ? ' is-loading' : ''}`}>
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
