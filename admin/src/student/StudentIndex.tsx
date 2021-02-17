import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StudentList } from "./StudentList";
import { CreateStudent } from "./CreateStudent";
import { Student } from "./Student";

export const StudentIndex = (): React.ReactElement => {
  useBreadcrumbs("/students/", "Students");

  return (
    <Switch>
      <PrivateRoute exact path={"/students/"} component={StudentList} />
      <PrivateRoute path={"/students/new"} component={CreateStudent} />
      <PrivateRoute path={"/students/:id"} component={Student} />
    </Switch>
  );
};
