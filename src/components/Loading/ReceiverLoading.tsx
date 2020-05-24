import React from "react";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import ListLoading from "./components/ListLoading";

const ReceiverLoading: React.FC = () => {
  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <ListLoading items={1} />
        </IonCardHeader>
        <IonCardContent>
          <ListLoading items={7} />
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default ReceiverLoading;
