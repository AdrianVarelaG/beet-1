import React from "react";
import MenuSettings from "../../pages/MenuSettings";
import { Route, Redirect, Switch } from "react-router-dom";
import RouteMenu from "./RouteMenu";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {

  return (
    <Switch>
      <Redirect path="/settings" to="/settings/menu" exact/>
      <Route path="/settings/menu">
        <RouteMenu title="Configuracion">
          <MenuSettings />
        </RouteMenu>
      </Route>
    </Switch>
  );
};

export default Settings;
