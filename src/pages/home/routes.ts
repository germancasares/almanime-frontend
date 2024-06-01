import Home from '.';
import { Routes } from '../../types/typescript/routes';
import { withAccessToken } from '../../utils';

const routes: Routes = {
  view: {
    path: '/',
    to: () => routes.view.path,
    component: withAccessToken(Home),
  },
};

export default routes;
