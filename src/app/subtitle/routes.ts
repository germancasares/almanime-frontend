import { withAuthenticationRequired } from '@auth0/auth0-react';

import Build from './build';
import Create from './create';

const toCreateSubtitle = (fansubAcronym: string): string => `/subtitle/${fansubAcronym}/create`;

const routes = {
  create: {
    path: toCreateSubtitle(':fansubAcronym'),
    to: toCreateSubtitle,
    component: withAuthenticationRequired(Create),
  },
  build: {
    path: '/subtitle/build',
    component: Build,
  },
};

export default routes;
