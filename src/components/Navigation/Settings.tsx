import React from "react";
import MenuSettings from "../../pages/MenuSettings";
import { Route, Switch } from "react-router-dom";
import RouteMenu from "./RouteMenu";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {

  return (
    <Switch>
      <Route path="/settings">
        <RouteMenu title="Configuracion">
          <MenuSettings />
        </RouteMenu>
      </Route>
    </Switch>
  );
};

export default Settings;
