import React from "react";
import { IonItem, IonLabel } from "@ionic/react";

import "./message.css";
import { Message as MessageType } from "../../pages/Messages";

interface MessageProps  extends MessageType {

}

const Message: React.FC<MessageProps> = ({ title, content, status, date }) => {
  const message =
    status === "read" ? (
      <IonLabel>
        <h2 className="message-title message-title__read">{title}</h2>
        <span className="message-date message-date__read">{date}</span>
        <p>{content}</p>
      </IonLabel>
    ) : (
      <IonLabel>
        <h2 className="message-title message-title__unread">{title}</h2>
        <span className="message-date message-date__unread">{date}</span>
        <p>{content}</p>
      </IonLabel>
    );

  return (
    <IonItem button detail={false}>
      {message}
    </IonItem>
  );
};

export default Message;
