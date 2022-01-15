import homeRoutes from './home/routes';
import animeRoutes from './anime/routes';
import profileRoutes from './profile/routes';
import settingsRoutes from './settings/routes';
import fansubRoutes from './fansub/routes';
import subtitleRoutes from './subtitle/routes';

const routes = {
  ...homeRoutes,
  ...animeRoutes,
  ...profileRoutes,
  ...settingsRoutes,
  ...fansubRoutes,
  ...subtitleRoutes,
};

export default routes;
