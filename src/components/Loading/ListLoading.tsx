import React from "react";
import { IonList, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";

import "./listLoading.css";

interface ListLoadingProps {
  items: number;
}

const ListLoading: React.FC<ListLoadingProps> = ({ items }) => {
  const elements: JSX.Element[] = [];

  for (let i = 0; i < items; i++) {
    elements.push(
      <IonItem key={i}>
        <IonLabel>
          <h3>
            <IonSkeletonText animated className="loading-list__name" />
          </h3>
          <p>
            <IonSkeletonText animated className="loading-list__details" />
          </p>
        </IonLabel>
      </IonItem>
    );
  }

  return <IonList>{elements}</IonList>;
};

export default ListLoading;
