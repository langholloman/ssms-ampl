import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { OrganizationList } from "./OrganizationList";
import { CreateOrganization } from "./CreateOrganization";
import { Organization } from "./Organization";

export const OrganizationIndex = (): React.ReactElement => {
  useBreadcrumbs("/organizations/", "Organizations");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/organizations/"}
        component={OrganizationList}
      />
      <PrivateRoute
        path={"/organizations/new"}
        component={CreateOrganization}
      />
      <PrivateRoute path={"/organizations/:id"} component={Organization} />
    </Switch>
  );
};
