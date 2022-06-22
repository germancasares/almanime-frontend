import List from './list';
import View from './view';

const toAnime = (slug: string): string => `/animes/${slug}`;

const routes = {
  list: {
    path: '/animes',
    component: List,
  },
  view: {
    path: toAnime(':slug'),
    to: toAnime,
    component: View,
  },
};

export default routes;
