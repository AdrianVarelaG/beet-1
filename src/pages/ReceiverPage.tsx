import React from "react";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import ReceiverInfo from "../components/Settings/ReceiverInfo";
import ReceiverForm from "../components/Settings/ReceiverForm";

interface Props {}

const ReceiverPage: React.FC<Props> = () => {
  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Datos fiscales</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ReceiverForm />
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default ReceiverPage;
