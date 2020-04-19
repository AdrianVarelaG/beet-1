import React from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import {
  swapHorizontal,
  checkmarkDoneOutline,
  timeOutline,
  warningOutline,
  trash,
} from "ionicons/icons";
import { Receipt as ReceiptType } from "./Receipts";

import "./receipt.css";

const setIcon = (status: string) => {
  switch (status) {
    case "IN_PROGRESS":
      return swapHorizontal;
    case "DONE":
      return checkmarkDoneOutline;
    case "GENERATING":
      return timeOutline;
    case "ERROR":
      return warningOutline;
  }
};

interface ReceiptProps {
  receipt: ReceiptType;
  slidingRef: React.Ref<HTMLIonItemSlidingElement>;
  onDelete: (receiptId: string) => void;
}

const Receipt: React.FC<ReceiptProps> = ({
  receipt: { id, status, business, createdDate, date, amount },
  slidingRef,
  onDelete,
}) => {
  let color = "medium";
  if (status === "DONE") color = "success";
  if (status === "ERROR") color = "danger";

  const deleteHandler = () => {
    onDelete(id);
  }

  const item = (
    <IonItem
      button
      detail={status === "error"}
      routerLink={`/receipts/receipt/${id}`}
    >
      <IonIcon icon={setIcon(status)} slot="start" color={color}  />
      <IonLabel>
        <h3 className="receipt-title">{business || "Identificando"}</h3>
        <span className="receipt-date">{createdDate}</span>
        <p>
          {date || "Identificando"} &nbsp;&mdash;&nbsp;
          {amount}
        </p>
      </IonLabel>
    </IonItem>
  );

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItemOptions side="start">
        <IonItemOption onClick={deleteHandler} color={status==="GENERATING" ? "medium" :"danger"} disabled={status==="GENERATING"}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
      {item}
      <IonItemOptions side="end">
        <IonItemOption onClick={() => {}}>Reintentar</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default Receipt;
