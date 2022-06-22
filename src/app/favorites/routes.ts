import { withAuthenticationRequired } from '@auth0/auth0-react';
import Favorites from '.';

const routes = {
  view: {
    path: '/favorites',
    component: withAuthenticationRequired(Favorites),
  },
};

export default routes;
