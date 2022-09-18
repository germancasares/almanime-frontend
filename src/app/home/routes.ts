import { withToken } from 'app/utils';
import { Routes } from 'types/typescript/routes';

import Home from '.';

const routes: Routes = {
  view: {
    path: '/',
    to: () => routes.view.path,
    component: withToken(Home),
  },
};

export default routes;
