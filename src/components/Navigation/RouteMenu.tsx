import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonPage
} from "@ionic/react";

interface RouteMenuProps {
  title: string
}

const RouteMenu : React.FC<RouteMenuProps> = ({title, children}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {children}
    </IonPage>
  );
};

export default RouteMenu;