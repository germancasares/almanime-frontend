import List from './list';
import View from './view';

const toAnime = (slug: string): string => `/animes/${slug}`;

const routes = {
  animeView: {
    path: toAnime(':slug'),
    to: toAnime,
    component: View,
  },
  animeList: {
    path: '/animes',
    component: List,
  },
};

export default routes;
