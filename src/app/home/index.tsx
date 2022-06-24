import { DateTime } from 'luxon';

import BookmarkApi from 'api/BookmarkApi';
import Helper from 'app/helper';
import SeasonType from 'enums/Season';

import Season from './_components/season';

import './index.scss';

const Home = ({ token }: { token?: string }) => {
  const now = DateTime.now();
  const year = now.month === 12 ? now.year + 1 : now.year;
  const season = Helper.GetSeason(now);

  const { data: bookmarks } = BookmarkApi.Get(token);

  return (
    <main id="home" className="container">
      <section className="section">
        <h1 className="title">
          {`${season} Season`}
        </h1>
        <Season
          year={year}
          season={season}
          bookmarks={bookmarks}
          token={token}
        />
      </section>
      <section className="section">
        <h1 className="title">
          Fall Season
        </h1>
        <Season
          year={2021}
          season={SeasonType.Fall}
          bookmarks={bookmarks}
          token={token}
        />
      </section>
    </main>
  );
};

export default Home;
