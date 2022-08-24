import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Routes } from 'types/typescript/routes';
import Build from './build';
import Create from './create';

const toCreateSubtitle = (fansubAcronym: string): string => `/subtitle/${fansubAcronym}/create`;

const routes: Routes = {
  create: {
    path: toCreateSubtitle(':fansubAcronym'),
    to: toCreateSubtitle,
    component: withAuthenticationRequired(Create),
  },
  build: {
    path: '/subtitle/build',
    to: () => routes.build.path,
    component: Build,
    hideFooter: true,
  },
};

export default routes;
