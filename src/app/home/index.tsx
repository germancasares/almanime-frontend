import { useSelector, useDispatch } from 'react-redux';
import { State } from 'app/store';
import './index.scss';
import { useEffect, useState } from 'react';
import Pagination from 'components/pagination';
import Helper from 'app/helper';
import { loadSeason } from './store/actions';
import Season from './_components/season';
import { DateTime } from 'luxon';

const Home = () => {
  const dispatch = useDispatch();
  const season = Helper.GetSeason(DateTime.now());
  const animes = useSelector((state: State) => state.home.animes);
  const animesCount = useSelector((state: State) => state.home.meta.count);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadSeason(page));
  }, [page, dispatch]);

  return (
    <main id="home" className="container fh">
      <section className="section">
        <h1 className="title">
          {`${season} Season`}
        </h1>
        <Season animes={animes} />
        <Pagination
          total={animesCount}
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
