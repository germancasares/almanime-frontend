import Create from './create';
import View from './view';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const toFansub = (acronym: string): string => `/fansub/${acronym}`;

const routes = {
  fansubCreate: {
    path: '/fansub/create',
    component: withAuthenticationRequired(Create),
  },
  fansubView: {
    path: toFansub(':acronym'),
    to: toFansub,
    component: View,
  },
};

export default routes;
