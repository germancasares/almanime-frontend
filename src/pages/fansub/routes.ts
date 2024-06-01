import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Routes } from '../../types/typescript/routes';
import { withAccessToken } from '../../utils';
import Create from './create';
import Edit from './edit';
import List from './list';
import View from './view';

const toFansub = (acronym: string): string => `/fansubs/${acronym}`;
const toEditFansub = (acronym: string): string => `/fansubs/${acronym}/edit`;

const routes: Routes = {
  create: {
    path: '/fansubs/create',
    to: () => routes.create.path,
    component: withAuthenticationRequired(Create),
  },
  list: {
    path: '/fansubs',
    to: () => routes.list.path,
    component: withAccessToken(List),
  },
  view: {
    path: toFansub(':acronym'),
    to: toFansub,
    component: withAccessToken(View),
  },
  edit: {
    path: toEditFansub(':acronym'),
    to: toEditFansub,
    component: withAuthenticationRequired(withAccessToken(Edit)),
  },
};

export default routes;
