import Settings from '.';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const routes = {
  edit: {
    path: '/settings',
    component: withAuthenticationRequired(Settings),
  },
};

export default routes;
