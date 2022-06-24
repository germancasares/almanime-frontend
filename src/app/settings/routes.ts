import { withAuthenticationRequired } from '@auth0/auth0-react';

import Settings from '.';

const routes = {
  edit: {
    path: '/settings',
    component: withAuthenticationRequired(Settings),
  },
};

export default routes;
