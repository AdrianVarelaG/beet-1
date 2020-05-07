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

import "./receipt.css";
import gql from "graphql-tag";
import {
  IReceiptDataListFragment,
  IReceiptStatus,
} from "../../generated/graphql";

const setIcon = (status: IReceiptStatus) => {
  switch (status) {
    case IReceiptStatus.InProgress:
      return swapHorizontal;
    case IReceiptStatus.Done:
      return checkmarkDoneOutline;
    case IReceiptStatus.Generating:
      return timeOutline;
    case IReceiptStatus.Error:
      return warningOutline;
  }
};

interface Props {
  slidingRef: React.Ref<HTMLIonItemSlidingElement>;
  onDelete: (receiptId: string) => void;
  receipt: IReceiptDataListFragment | null;
}

const Receipt = (props: Props) => {
  const { slidingRef, onDelete, receipt } = props;

  let color = "medium";
  if (receipt!.status === IReceiptStatus.Done) color = "success";
  if (receipt!.status === IReceiptStatus.Error) color = "danger";

  const deleteHandler = () => {
    onDelete(receipt!.id);
  };

  const item = (
    <IonItem
      button
      detail={false}
      routerLink={`/receipts/receipt/${receipt!.id}`}
    >
      <IonIcon icon={setIcon(receipt!.status)} slot="start" color={color} />
      <IonLabel>
        <h3 className="receipt-title">
          {receipt!.business || "Identificando"}
        </h3>
        <span className="receipt-date">{receipt!.createdDate}</span>
        <p>
          {receipt!.date || "Identificando"} &nbsp;&mdash;&nbsp;
          {receipt!.amount}
        </p>
      </IonLabel>
    </IonItem>
  );

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItemOptions side="start">
        <IonItemOption
          onClick={deleteHandler}
          color={
            receipt!.status === IReceiptStatus.Generating ? "medium" : "danger"
          }
          disabled={receipt!.status === IReceiptStatus.Generating}
        >
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
      {item}
    </IonItemSliding>
  );
};

Receipt.fragment = gql`
  fragment ReceiptDataList on Receipt {
    id
    business
    createdDate
    amount
    status
    date
  }
`;

export default Receipt;
