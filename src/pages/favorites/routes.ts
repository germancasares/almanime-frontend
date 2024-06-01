import { withAuthenticationRequired } from "@auth0/auth0-react";
import Favorites from ".";
import { Routes } from "../../types/typescript/routes";
import { withAccessToken } from "../../utils";

const routes: Routes = {
  view: {
    path: "/favorites",
    to: () => routes.view.path,
    component: withAuthenticationRequired(withAccessToken(Favorites)),
  },
};

export default routes;
