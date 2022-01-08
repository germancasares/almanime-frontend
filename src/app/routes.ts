import homeRoutes from './home/routes';
import animeRoutes from './anime/routes';
import profileRoutes from './profile/routes';
import settingsRoutes from './settings/routes';
import fansubRoutes from './fansub/routes';

const routes = {
  ...homeRoutes,
  ...animeRoutes,
  ...profileRoutes,
  ...settingsRoutes,
  ...fansubRoutes,
};

export default routes;
