import React, { useState, useEffect } from "react";
import { IonContent } from "@ionic/react";
import Messages from "../components/Messages/Messages";
import MessageLoading from "../components/Messages/MessageLoading";

export interface Message {
  id: string;
  title: string;
  type: string;
  content: string;
  date: string;
  status: string;
}

const MessagesPage = () => {
  const [messages, setMessage] = useState<Message[]|null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMessage([
        {
          id: "1",
          title: "Error al generar factura",
          type: "error",
          content:
            'La factura del establecimiento "OXXO" no fue posible generarla ya que el campo de folio no es legible en el ticket de compra ',
          date: "2019-07-07",
          status: "read"
        },
        {
          id: "2",
          title: "Factura generada con exito",
          type: "ok",
          content:
            'Su factia del establecimiento "Costco" por $ 1230.00 se genero con exito',
          date: "2019-07-01",
          status: "unread"
        }
      ]);
    }, 500);
  }, []);

  return (
    <IonContent>
      {messages == null ? (
        <MessageLoading />
      ) : (
        <Messages messagesList={messages} />
      )}
    </IonContent>
  );
};

export default MessagesPage;
