import helloRoutes from './hello/routes';
import worldRoutes from './world/routes';

const routes = [
  ...helloRoutes,
  ...worldRoutes,
];

export default routes;
