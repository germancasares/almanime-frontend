import homeRoutes from './home/routes';
import animeRoutes from './anime/routes';
import profileRoutes from './profile/routes';
import settingsRoutes from './settings/routes';
import fansubRoutes from './fansub/routes';
import subtitleRoutes from './subtitle/routes';
import userRoutes from './user/routes';

const routes = {
  ...homeRoutes,
  ...animeRoutes,
  ...profileRoutes,
  ...settingsRoutes,
  ...fansubRoutes,
  ...subtitleRoutes,
  ...userRoutes,
};

export default routes;
