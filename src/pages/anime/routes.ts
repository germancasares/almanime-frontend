import { Routes } from "../../types/typescript/routes";
import List from "./list";
import View from "./view";

const toAnime = (slug: string): string => `/animes/${slug}`;

const routes: Routes = {
  list: {
    path: "/animes",
    to: () => routes.list.path,
    component: List,
  },
  view: {
    path: toAnime(":slug"),
    to: toAnime,
    component: View,
  },
};

export default routes;
