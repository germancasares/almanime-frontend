import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Routes } from 'types/typescript/routes';
import Favorites from '.';

const routes: Routes = {
  view: {
    path: '/favorites',
    to: () => routes.view.path,
    component: withAuthenticationRequired(Favorites),
  },
};

export default routes;
