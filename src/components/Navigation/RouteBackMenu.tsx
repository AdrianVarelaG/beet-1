import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonPage
} from "@ionic/react";

interface RouteBackProps {
  title: string;
  redirectBack: string;
}

const RouteBackMenu: React.FC<RouteBackProps> = ({
  title,
  redirectBack,
  children
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={redirectBack} text="" />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {children}
    </IonPage>
  );
};

export default RouteBackMenu;
