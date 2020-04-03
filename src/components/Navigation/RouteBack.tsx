import React, { Fragment } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton
} from "@ionic/react";

interface RouteBackMenu {
  title: string;
  redirectBack: string;
  children: string;
}

const routeBack : React.FC<RouteBackMenu> = ({ title, redirectBack, children }) => {
  return (
    <Fragment>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={redirectBack}
              text=""
            />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {children}
    </Fragment>
  );
};

export default routeBack;
