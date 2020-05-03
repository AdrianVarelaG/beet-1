import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSpinner } from "@ionic/react";
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

const Menu = React.lazy(() => import("./components/Navigation/Menu"));
const Settings = React.lazy(() => import("./components/Navigation/Settings"));
const TabsMenu = React.lazy(() => import("./components/Navigation/TabsMenu"));

const Main: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <React.Suspense fallback={<IonSpinner />}>
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <TabsMenu />
          </Route>
        </IonRouterOutlet>
      </React.Suspense>
    </IonReactRouter>
  </IonApp>
);

export default Main;