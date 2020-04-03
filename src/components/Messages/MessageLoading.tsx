import React, { Fragment } from "react";
import { IonItem, IonSkeletonText, IonLabel, IonList } from "@ionic/react";

const amount = [1, 2, 3];

const MessageLoading: React.FC = () => {
  const items = amount.map(i => (
    <IonItem key={i}>
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
    <Fragment>
      <IonList>{items}</IonList>
    </Fragment>
  );
};

export default MessageLoading;
