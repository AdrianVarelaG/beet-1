import React from "react";
import {
  IonList,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import Message from "./Message";
import gql from "graphql-tag";
import { INotificationListFragment } from "../../generated/graphql";

interface Props {
  data?: INotificationListFragment;
  filter: String;
}

const Messages = (props: Props) => {
  const messagesList =
    props.filter === "unread"
      ? props.data?.notifications.filter((m) => m?.read === false)
      : props.data?.notifications;

  if (!messagesList || messagesList.length === 0)
    return (
      <IonCardHeader>
        <IonCardTitle className="ion-text-center">
          No se encontraron Notificaciones
        </IonCardTitle>
      </IonCardHeader>
    );

  const items = messagesList.map((m) => <Message key={m?.id} data={m} />);

  return (
    <IonCardContent className="ion-no-padding">
      <IonList>{items}</IonList>
    </IonCardContent>
  );
};

Messages.fragment = gql`
  fragment NotificationList on NotificationResponse {
    totalCount
    notifications {
      ...NotificationDataList
    }
  }
  ${Message.fragment}
`;

export default Messages;
