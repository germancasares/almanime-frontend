import Profile from '.';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const routes = {
  profile: {
    path: '/profile',
    component: withAuthenticationRequired(Profile),
  },
};

export default routes;
