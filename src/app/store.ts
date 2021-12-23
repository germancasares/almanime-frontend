import { State as HomeState } from './home/store/type';
import { State as AnimeState } from './anime/store/type';
import homeReducer from './home/store/reducers';
import animeReducer from './anime/store/reducers';

export type State = {
  home: HomeState,
  anime: AnimeState,
};

const appReducer = {
  home: homeReducer,
  anime: animeReducer,
};

export default appReducer;
