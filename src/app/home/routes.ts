import { withToken } from 'app/utils';
import Home from '.';

const routes = {
  view: {
    path: '/',
    component: withToken(Home),
  },
};

export default routes;
