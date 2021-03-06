import React, { useContext } from "react";
import {
  IonIcon,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonBadge,
} from "@ionic/react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { home, list, mailOpen, settings, help, logOut } from "ionicons/icons";
import { UserContext } from "../../context/user-context";

interface MenuItem {
  title: string;
  path: string;
  icon: string;
  badge?: number;
}

interface ListMenu {
  appPages: MenuItem[];
  loggedInPages: MenuItem[];
}

const routes: ListMenu = {
  appPages: [
    { title: "Inicio", path: "/", icon: home },
    { title: "Recibos", path: "/receipt", icon: list },
    { title: "Notificaciones", path: "/message", icon: mailOpen },
  ],
  loggedInPages: [
    { title: "Configuracion", path: "/settings", icon: settings },
    { title: "Soporte", path: "/support", icon: help },
    { title: "Logout", path: "/logout", icon: logOut },
  ],
};

interface MenuProps extends RouteComponentProps {}

const Menu: React.FC<MenuProps> = () => {
  const ctx = useContext(UserContext);

  if (ctx) routes.appPages[2].badge = ctx.unReadNotification;

  function renderListItems(list: MenuItem[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem routerLink={p.path} routerDirection="none">
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
            {p.badge && <IonBadge slot="end">{p.badge}</IonBadge>}
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>{renderListItems(routes.appPages)}</IonList>
        <IonList>
          <IonListHeader>Cuenta</IonListHeader>
          {renderListItems(routes.loggedInPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
