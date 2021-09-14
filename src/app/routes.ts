import homeRoutes from './home/routes';
import animeRoutes from './anime/routes';
import accountRoutes from './account/routes';

const routes = {
  ...homeRoutes,
  ...animeRoutes,
  ...accountRoutes,
};

export default routes;
