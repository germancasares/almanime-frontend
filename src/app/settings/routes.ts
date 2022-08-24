import { withAuthenticationRequired } from '@auth0/auth0-react';

import { Routes } from 'types/typescript/routes';

import Settings from '.';

const routes: Routes = {
  edit: {
    path: '/settings',
    to: () => routes.edit.path,
    component: withAuthenticationRequired(Settings),
  },
};

export default routes;
