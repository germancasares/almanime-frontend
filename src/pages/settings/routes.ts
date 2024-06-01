import { withAuthenticationRequired } from "@auth0/auth0-react";
import Settings from ".";
import { Routes } from "../../types/typescript/routes";

const routes: Routes = {
  edit: {
    path: "/settings",
    to: () => routes.edit.path,
    component: withAuthenticationRequired(Settings),
  },
};

export default routes;
