import React from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Logout from "./components/logout";
import RouteMenu from "./components/Navigation/RouteMenu";
import RouteBackMenu from "./components/Navigation/RouteBackMenu";

const Menu = React.lazy(() => import("./components/Navigation/Menu"));
const SettingsMenu = React.lazy(() => import("./pages/SettingsMenu"));
const TabsMenu = React.lazy(() => import("./components/Navigation/TabsMenu"));
const SettingsPage = React.lazy(() =>
  import("./pages/ReceiverPage")
);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <React.Suspense fallback={<IonSpinner />}>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/settings/receiver">
              <RouteBackMenu
                redirectBack="/settings"
                title="Perfil de facturacion"
              >
                <SettingsPage />
              </RouteBackMenu>
            </Route>
            <Route path="/settings">
              <RouteMenu title="Configuracion">
                <SettingsMenu />
              </RouteMenu>
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <TabsMenu />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </React.Suspense>
    </IonReactRouter>
  </IonApp>
);

export default App;
