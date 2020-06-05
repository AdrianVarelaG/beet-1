import React from "react";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import ListLoading from "./components/ListLoading";

interface MessageLoadingProps {}

const MessageLoading: React.FC<MessageLoadingProps> = () => {
  return (
    <IonContent>
      <IonCard>
        <IonCardSubtitle>
          <ListLoading items={1} />
        </IonCardSubtitle>
        <IonCardHeader>
          <ListLoading items={1} />
        </IonCardHeader>
        <IonCardContent>
          <ListLoading items={2} />
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default MessageLoading;
