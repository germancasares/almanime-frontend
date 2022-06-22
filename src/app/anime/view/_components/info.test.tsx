import { createRoot } from 'react-dom/client';
import Season from 'enums/Season';
import AnimeStatus from 'enums/AnimeStatus';
import Info from './info';

it('renders without crashing', () => {
  const div = document.createElement('div');
  createRoot(div).render(
    <Info
      anime={{
        id: 'abcd',
        kitsuID: 1,
        slug: 'aaaa',
        name: 'AAAAAAAA',
        season: Season.Summer,
        status: AnimeStatus.Finished,
        synopsis: '',
        startDate: null,
      }}
      episodesCount={0}
    />,
  );
});
