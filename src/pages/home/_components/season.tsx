import { useEffect, useState } from 'react';
import AnimeApi from '../../../api/AnimeApi';
import BookmarkApi from '../../../api/BookmarkApi';
import Loader from '../../../components/loader';
import Pagination from '../../../components/pagination';
import Panel from '../../../components/panel';
import Season from '../../../enums/Season';
import Helper from '../../../helper';
import routes from '../../routes';
import './season.scss';

type Props = {
  year: number;
  season: Season;
  bookmarks?: string[];
  accessToken?: string;
};

const SeasonPage = ({
  bookmarks, accessToken, season, year,
}: Props) => {
  const [page, setPage] = useState(1);
  const { data: animes } = AnimeApi.GetSeason(year, season, page, true);
  const { data: previousAnimes } = AnimeApi.GetSeason(year, season, page - 1, true);
  const { data: nextAnimes } = AnimeApi.GetSeason(year, season, page + 1, true);

  const { mutateAsync: createAsync } = BookmarkApi.Create();
  const { mutateAsync: deleteAsync } = BookmarkApi.Delete();

  useEffect(() => {
    previousAnimes?.models.forEach((anime) => {
      if (anime.coverImages?.tiny) {
        const img = new Image();
        img.src = anime.coverImages?.tiny;
      }
    });

    nextAnimes?.models.forEach((anime) => {
      if (anime.coverImages?.tiny) {
        const img = new Image();
        img.src = anime.coverImages?.tiny;
      }
    });
  }, [nextAnimes?.models, previousAnimes?.models]);

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
                        deleteAsync({ slug: anime.slug, accessToken });
                      } else {
                        createAsync({ slug: anime.slug, accessToken });
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
