import { useState } from 'react';

import AnimeApi from 'api/AnimeApi';
import BookmarkApi from 'api/BookmarkApi';
import Helper from 'app/helper';
import routes from 'app/routes';
import Loader from 'components/loader';
import Pagination from 'components/pagination';
import Panel from 'components/panel';
import Season from 'enums/Season';

import './season.scss';

type Props = {
  year: number;
  season: Season;
  bookmarks?: string[];
  token?: string;
};

const SeasonPage = ({
  bookmarks, token, season, year,
}: Props) => {
  const [page,
    setPage] = useState(1);
  const { data: animes } = AnimeApi.GetSeason(year, season, page, true);

  const { mutateAsync: createAsync } = BookmarkApi.Create();
  const { mutateAsync: deleteAsync } = BookmarkApi.Delete();

  if (!animes) return (<Loader />);

  return (
    <div id={`season-${season.toLocaleLowerCase()}`}>
      {
        Helper.Chunk(animes.models, 4).map((chunk) => (
          <div key={`chunk-${chunk[0].slug}`} className="tile is-ancestor">
            {chunk.map((anime) => (
              <article key={anime.kitsuID} className="tile is-parent">
                <Panel
                  name={anime.name}
                  image={anime.coverImages?.tiny}
                  to={routes.anime.view.to(anime.slug)}
                  star={{
                    shouldShow: !!bookmarks,
                    isSelected: !!bookmarks?.includes(anime.slug),
                    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                      event.preventDefault();

                      const isThere = bookmarks?.includes(anime.slug);
                      if (isThere) {
                        deleteAsync({ slug: anime.slug, token });
                      } else {
                        createAsync({ slug: anime.slug, token });
                      }
                    },
                  }}
                />
              </article>
            ))}
          </div>
        ))
      }
      <Pagination
        total={animes.meta.count}
        perPage={8}
        steps={1}
        current={page}
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default SeasonPage;
