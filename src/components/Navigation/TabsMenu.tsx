import React, { useContext } from "react";
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonBadge,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import { home, list, mailOpen } from "ionicons/icons";
import RouteMenu from "./RouteMenu";
import Home from "../../pages/Home";
import MessagesPage from "../../pages/MessagesPage";
import Receipts from "../../pages/ReceiptPage";

import "./tabMenu.css";
import { UserContext } from "../../context/user-context";

const TabsMenu: React.FC = () => {
  const ctx = useContext(UserContext);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" exact={true}>
          <RouteMenu title="Inicio">
            <Home />
          </RouteMenu>
        </Route>
        <Route path="/receipts" exact>
          <RouteMenu title="Recibos">
            <Receipts />
          </RouteMenu>
        </Route>
        <Route path="/messages" exact={true}>
          <RouteMenu title="Notificaciones">
            <MessagesPage />
          </RouteMenu>
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="receipts" href="/receipts">
          <IonIcon icon={list} />
          <IonLabel>Recibos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="messages" href="/messages">
          <IonIcon icon={mailOpen} />
          <IonLabel>Notificaciones</IonLabel>
          {ctx.unReadNotification && (
            <IonBadge>{ctx.unReadNotification}</IonBadge>
          )}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsMenu;
