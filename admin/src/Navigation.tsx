import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Organizations" to="/organizations" />
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Schools" to="/schools" />
      <NavigationItem name="Students" to="/students" />
      <NavigationItem name="Classes" to="/classes" />
      <NavigationItem name="Training Tracks" to="/training-tracks" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
