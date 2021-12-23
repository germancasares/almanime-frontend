import Anime from '.';

const toAnime = (slug: string): string => `/anime/${slug}`;

const routes = {
  anime: {
    path: toAnime(':slug'),
    to: toAnime,
    component: Anime,
  },
};

export default routes;
