import React from "react";
import {
  IonThumbnail,
  IonItem,
  IonSkeletonText,
  IonLabel,
  IonList,
} from "@ionic/react";
import "./receiptLoading.css";

const receipts = [1, 2, 3];

const ReceiptLoading: React.FC = () => {
  const items = receipts.map(i => (
    <IonItem key={i}>
      <IonThumbnail slot="start">
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText
            animated
            className="loading-receipt__business-name"
          />
        </h3>
        <p>
          <IonSkeletonText
            animated
            className="loading-receipt__business-details"
          />
        </p>
      </IonLabel>
    </IonItem>
  ));

  return (
      <IonList>{items}</IonList>
  );
};

export default ReceiptLoading;
