import React from "react";
import { IonItem, IonLabel } from "@ionic/react";
import "./message.css";
import gql from "graphql-tag";
import { INotificationDataListFragment } from "../../generated/graphql";

interface Props {
  data?: INotificationDataListFragment | null;
}

const Message = ({ data }: Props) => {
  const message = data ? (
    data.read === true ? (
      <IonLabel>
        <h2 className="message-title message-title__read">{data.title}</h2>
        <span className="message-date message-date__read">{data.date}</span>
        <p>{data.message}</p>
      </IonLabel>
    ) : (
      <IonLabel>
        <h2 className="message-title message-title__unread">{data.title}</h2>
        <span className="message-date message-date__unread">{data.date}</span>
        <p>{data.message}</p>
      </IonLabel>
    )
  ) : null;

  return (
    <IonItem button detail={false}>
      {message}
    </IonItem>
  );
};

Message.fragment = gql`
  fragment NotificationDataList on Notification {
    id
    title
    message
    read
    date
  }
`;

export default Message;
