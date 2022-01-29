import Panel from 'components/panel';
import { Anime } from 'types/anime';
import Helper from 'app/helper';
import './season.scss';
import routes from 'app/routes';
import BookmarkApi from 'api/BookmarkApi';

type Props = {
  animes: Anime[];
  bookmarks?: string[];
  token?: string;
};

const Season = ({ animes, bookmarks, token }: Props) => {
  const chunks = Helper.Chunk(animes, 4);

  const { mutateAsync: createAsync } = BookmarkApi.Create();
  const { mutateAsync: deleteAsync } = BookmarkApi.Delete();

  return (
    <div id="season">
      {
        chunks.map((chunk, index) => (
          <div key={`chunk-${index}`} className="tile is-ancestor">
            {chunk.map((anime) => (
              <article key={anime.kitsuID} className="tile is-parent">
                <Panel
                  name={anime.name}
                  image={anime.coverImages?.tiny}
                  to={routes.animeView.to(anime.slug)}
                  star={{
                    shouldShow: !!bookmarks,
                    isSelected: !!bookmarks?.includes(anime.slug),
                    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                      event.preventDefault();

                      const isThere = bookmarks?.includes(anime.slug);
                      if (isThere) {
                        deleteAsync({ slug: anime.slug, token: token });
                      } else {
                        createAsync({ slug: anime.slug, token: token });
                      }
                    },
                  }}
                />
              </article>
            ))}
          </div>
        ))
      }
    </div>
  );
};

export default Season;
