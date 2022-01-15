import { withAuthenticationRequired } from '@auth0/auth0-react';
import Create from './create';

const toCreateSubtitle = (fansubAcronym: string): string => `/subtitle/${fansubAcronym}/create`;

const routes = {
  subtitleCreate: {
    path: toCreateSubtitle(':fansubAcronym'),
    to: toCreateSubtitle,
    component: withAuthenticationRequired(Create),
  },
};

export default routes;
