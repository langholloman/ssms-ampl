import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { SchoolList } from "./SchoolList";
import { CreateSchool } from "./CreateSchool";
import { School } from "./School";

export const SchoolIndex = (): React.ReactElement => {
  useBreadcrumbs("/schools/", "Schools");

  return (
    <Switch>
      <PrivateRoute exact path={"/schools/"} component={SchoolList} />
      <PrivateRoute path={"/schools/new"} component={CreateSchool} />
      <PrivateRoute path={"/schools/:id"} component={School} />
    </Switch>
  );
};
