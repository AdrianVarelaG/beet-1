import React from "react";
import { IonList } from "@ionic/react";
import Message from "./Message";
import { Message as MessageType } from "../../pages/Messages";

interface MessagesProps {
  messagesList: MessageType[];
}

const Messages : React.FC<MessagesProps> = ({ messagesList }) => {
  const items = messagesList.map(m => (
    <Message
      key={m.id}
      id={m.id}
      title={m.title}
      content={m.content}
      status={m.status}
      date={m.date}
    />
  ));

  return <IonList>{items}</IonList>;
};

export default Messages;
