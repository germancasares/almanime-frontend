import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Routes } from "../../types/typescript/routes";
import { withAccessToken } from "../../utils";
import Create from "./create";
import Edit from "./edit";
import List from "./list";
import View from "./view";

const toUser = (name: string): string => `/users/${name}`;

const routes: Routes = {
  create: {
    path: "/users/create",
    to: () => routes.create.path,
    component: withAuthenticationRequired(withAccessToken(Create, true)),
  },
  edit: {
    path: "/profile",
    to: () => routes.edit.path,
    component: withAuthenticationRequired(withAccessToken(Edit)),
  },
  list: {
    path: "/users",
    to: () => routes.list.path,
    component: List,
  },
  view: {
    path: toUser(":name"),
    to: toUser,
    component: withAccessToken(View),
  },
};

export default routes;
