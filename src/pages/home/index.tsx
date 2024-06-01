import { DateTime } from "luxon";
import BookmarkApi from "../../api/BookmarkApi";
import { default as SeasonType } from "../../enums/Season";
import Helper from "../../helper";
import Season from "./_components/season";
import "./index.scss";

const Home = ({ accessToken }: { accessToken?: string }) => {
  const now = DateTime.now();
  const year = now.month === 12 ? now.year + 1 : now.year;
  const season = Helper.GetSeason(now);

  const { data: bookmarks } = BookmarkApi.Get(accessToken);

  return (
    <main id="home" className="container">
      <section className="section">
        <h1 className="title">{`${season} Season`}</h1>
        <Season
          year={year}
          season={season}
          bookmarks={bookmarks}
          accessToken={accessToken}
        />
      </section>
      <section className="section">
        <h1 className="title">Fall Season</h1>
        <Season
          year={2022}
          season={SeasonType.Fall}
          bookmarks={bookmarks}
          accessToken={accessToken}
        />
      </section>
    </main>
  );
};

export default Home;
