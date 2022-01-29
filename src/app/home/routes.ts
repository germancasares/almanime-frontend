import { withToken } from 'app/utils';
import Home from '.';

const routes = {
  home: {
    path: '/',
    component: withToken(Home),
  },
};

export default routes;
