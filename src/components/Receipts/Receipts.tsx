import React, { Fragment, useState, useRef } from "react";
import {
  IonAlert,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import ReceiptLoading from "./ReceiptLoading";
import ReceiptComponent from "./Receipt";
import gql from "graphql-tag";
import { IReceiptsListFragment } from "../../generated/graphql";


interface Props {
  loading: boolean;
  error: boolean;
  receipts: IReceiptsListFragment | undefined;
}

const Receipts = (props: Props) => {
  const [startDeleting, setStartDeleting] = useState(false);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const {loading, error, receipts} = props;

  const startDeleteHandler = (receiptId: string) => {
    console.log(receiptId);
    setStartDeleting(true);
  };
  const deleteHandler = () => {
    setStartDeleting(false);
    console.log("deleting");
  };

  if (loading) {
    return (
      <IonCard className="ion-no-margin ion-margin-start ion-margin-end">
        <IonCardContent className="ion-no-padding">
          <ReceiptLoading />
        </IonCardContent>
      </IonCard>
    );
  }

  if (error)
    return (
      <Fragment>
        <ReceiptLoading />
        <IonAlert
          isOpen={error}
          header={"Error"}
          subHeader={"Ups a ocurrido un error"}
          message={"No fue posible actualizar tu lista de recibos."}
          buttons={["OK"]}
        />
      </Fragment>
    );

  const items = receipts?.receipts?.map((r) => (
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
        {items && items.length > 0 && <IonList>{items}</IonList>}
        {(!items || items.length === 0) && (
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              No se encontraron recibos
            </IonCardTitle>
          </IonCardHeader>
        )}
      </IonCard>
    </Fragment>
  );
};

Receipts.fragment = gql`
  fragment ReceiptsList on Query {
    receipts (filter: $filter) {
      ...ReceiptDataList
      ticket {
        url
      } 
    }
  }
  ${ReceiptComponent.fragment}
`

export default Receipts;
