import { useState } from 'react';
import { DateTime } from 'luxon';

import AnimeApi from 'api/AnimeApi';

import Pagination from 'components/pagination';
import Helper from 'app/helper';
import Season from './_components/season';

import './index.scss';

const Home = () => {
  const now = DateTime.now();
  const year = now.month === 12 ? now.year + 1 : now.year;
  const season = Helper.GetSeason(now);

  const [page, setPage] = useState(1);
  const { data } = AnimeApi.GetSeason(year, season, page, true);

  return (
    <main id="home" className="container">
      <section className="section">
        <h1 className="title">
          {`${season} Season`}
        </h1>
        <Season animes={data?.models ?? []} />
        <Pagination
          total={data?.meta.count ?? 0}
          perPage={8}
          steps={1}
          current={page}
          onChange={(newPage) => setPage(newPage)}
        />
      </section>
    </main>
  );
};

export default Home;
