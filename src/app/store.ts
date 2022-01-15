import { State as HomeState } from './home/store/state';
import { State as AnimeState } from './anime/store/state';
import { State as FansubState } from './fansub/store/state';
import homeReducer from './home/store/reducers';
import animeReducer from './anime/store/reducers';
import fansubReducer from './fansub/store/reducers';

export type State = {
  home: HomeState,
  anime: AnimeState,
  fansub: FansubState,
};

const appReducer = {
  home: homeReducer,
  anime: animeReducer,
  fansub: fansubReducer,
};

export default appReducer;
