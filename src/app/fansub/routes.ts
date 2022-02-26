import { withAuthenticationRequired } from '@auth0/auth0-react';
import { withToken } from 'app/utils';

import Create from './create';
import View from './view';
import List from './list';
import Edit from './edit';

const toFansub = (acronym: string): string => `/fansubs/${acronym}`;
const toEditFansub = (acronym: string): string => `/fansubs/${acronym}/edit`;

const routes = {
  create: {
    path: '/fansubs/create',
    component: withAuthenticationRequired(Create),
  },
  list: {
    path: '/fansubs',
    component: List,
  },
  view: {
    path: toFansub(':acronym'),
    to: toFansub,
    component: withToken(View),
  },
  edit: {
    path: toEditFansub(':acronym'),
    to: toEditFansub,
    component: withAuthenticationRequired(withToken(Edit)),
  },
};

export default routes;
