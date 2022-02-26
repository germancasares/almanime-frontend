import Favorites from '.';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const routes = {
  view: {
    path: '/favorites',
    component: withAuthenticationRequired(Favorites),
  },
};

export default routes;
