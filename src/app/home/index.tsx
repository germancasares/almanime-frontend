import { useSelector, useDispatch } from 'react-redux';
import { State } from 'app/store';
import './index.scss';
import { useEffect, useState } from 'react';
import Pagination from 'components/pagination';
import { loadSeason } from './store/actions';
import Season from './_components/season';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const animes = useSelector((state: State) => state.home.animes);
  const [current, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadSeason(1));
  }, [dispatch]);

  return (
    <main id="home" className="container fh">
      <section className="section">
        <h1 className="title">Current Season</h1>
        <Season animes={animes} />
        <Pagination
          total={200}
          perPage={8}
          steps={1}
          current={current}
          onChange={(page) => setPage(page)}
        />
      </section>
    </main>
  );
};

export default Home;
