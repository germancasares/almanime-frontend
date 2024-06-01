import { Routes } from '../../../types/typescript/routes';
import List from './list';
import View from './view';

const toAnimeEpisodesList = (slug: string): string => `/animes/${slug}/episodes`;
const toAnimeEpisode = (slug: string, number: string): string => `/animes/${slug}/episodes/${number}`;

const routes: Routes = {
  list: {
    path: toAnimeEpisodesList(':slug'),
    to: toAnimeEpisodesList,
    component: List,
  },
  view: {
    path: toAnimeEpisode(':slug', ':number'),
    to: toAnimeEpisode,
    component: View,
  },
};

export default routes;
