import { State as HomeState } from './home/store/type';
import homeReducer from './home/store/reducers';

export type State = {
  home: HomeState,
};

const appReducer = {
  home: homeReducer,
};

export default appReducer;
