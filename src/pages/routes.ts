import episode from "./anime/episode/route";
import anime from "./anime/routes";
import fansub from "./fansub/routes";
import favorites from "./favorites/routes";
import home from "./home/routes";
import settings from "./settings/routes";
import subtitle from "./subtitle/routes";
import user from "./user/routes";

const routes = {
  home,
  anime,
  episode,
  favorites,
  settings,
  fansub,
  subtitle,
  user,
};

export default routes;
