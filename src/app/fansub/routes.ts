import { withAuthenticationRequired } from '@auth0/auth0-react';
import { withToken } from 'app/utils';

import Create from './create';
import View from './view';
import List from './list';

const toFansub = (acronym: string): string => `/fansubs/${acronym}`;

const routes = {
  fansubCreate: {
    path: '/fansubs/create',
    component: withAuthenticationRequired(Create),
  },
  fansubView: {
    path: toFansub(':acronym'),
    to: toFansub,
    component: withToken(View),
  },
  fansubList: {
    path: '/fansubs',
    component: List,
  },
};

export default routes;
