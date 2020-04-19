import React, { Fragment, useState, useRef } from "react";
import { IonAlert, IonList, IonCard, IonCardContent } from "@ionic/react";
import ReceiptLoading from "./ReceiptLoading";
import ReceiptComponent from "./Receipt";

export interface Receipt {
  id: string;
  business: string;
  createdDate: string;
  amount: string;
  status: string;
  date: string;
}

interface ReceiptsProps {
  loading: boolean;
  error: boolean;
  receipts: Receipt[] | undefined;
}

const Receipts: React.FC<ReceiptsProps> = ({ loading, error, receipts }) => {
  const [startDeleting, setStartDeleting] = useState(false);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

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

  const items = receipts?.map((r) => (
    <ReceiptComponent
      key={r.id}
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
        <IonCardContent className="ion-no-padding">
          <IonList>{items}</IonList>
        </IonCardContent>
      </IonCard>
    </Fragment>
  );
};

export default Receipts;
