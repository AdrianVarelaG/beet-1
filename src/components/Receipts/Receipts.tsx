import React, { Fragment, useState, useRef } from "react";
import {
  IonAlert,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import ReceiptComponent from "./Receipt";
import gql from "graphql-tag";
import { IReceiptsListFragment } from "../../generated/graphql";

interface Props {
  data?: IReceiptsListFragment;
}

const Receipts = (props: Props) => {
  const [startDeleting, setStartDeleting] = useState(false);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const { data } = props;

  const startDeleteHandler = (receiptId: string) => {
    setStartDeleting(true);
  };
  const deleteHandler = () => {
    setStartDeleting(false);
    console.log("deleting");
  };

  const items = data?.receipts.map((r) => (
    <ReceiptComponent
      key={r?.id}
      receipt={r}
      slidingRef={slidingOptionsRef}
      onDelete={startDeleteHandler}
    />
  ));

  return (
    <Fragment>
      <IonAlert
        isOpen={startDeleting}
        header="¿Estas seguro?"
        message="¿Quieres eliminar este recibo? Esta informacion no se puede recuperar."
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              slidingOptionsRef.current!.closeOpened();
              setStartDeleting(false);
            },
          },
          {
            text: "Si",
            handler: deleteHandler,
          },
        ]}
      />
      <IonCard className="ion-no-margin ion-margin-start ion-margin-end">
        {(!items || items.length === 0) && (
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              No se encontraron recibos
            </IonCardTitle>
          </IonCardHeader>
        )}
        <IonCardContent className="ion-no-padding">
          {items && items.length > 0 && <IonList>{items}</IonList>}
        </IonCardContent>
      </IonCard>
    </Fragment>
  );
};

Receipts.fragment = gql`
  fragment ReceiptsList on ReceiptResponse {
    receipts {
      ...ReceiptDataList
    }
  }
  ${ReceiptComponent.fragment}
`;

export default Receipts;
