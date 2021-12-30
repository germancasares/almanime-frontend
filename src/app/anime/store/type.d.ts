import { Anime } from 'types/anime';
import Episode from 'types/episode';

export type State = {
  anime: Anime,
  episodes: Episode[],
};
