import { withAuthenticationRequired } from '@auth0/auth0-react';
import { withToken } from 'app/utils';
import Create from './create';
import Edit from './edit';
import List from './list';
import View from './view';

const toUser = (name: string): string => `/users/${name}`;

const routes = {
  create: {
    path: '/users/create',
    component: withToken(Create),
  },
  edit: {
    path: '/profile',
    component: withAuthenticationRequired(Edit),
  },
  list: {
    path: '/users',
    component: List,
  },
  view: {
    path: toUser(':name'),
    to: toUser,
    component: withToken(View),
  },
};

export default routes;
