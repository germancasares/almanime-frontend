import { withToken } from 'app/utils';
import Create from './create';
import List from './list';

const routes = {
  userList: {
    path: '/users',
    component: List,
  },
  userCreate: {
    path: '/users/create',
    component: withToken(Create),
  },
};

export default routes;
