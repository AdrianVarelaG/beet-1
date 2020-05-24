import React, { useState, useEffect } from "react";
import { IonAlert } from "@ionic/react";
import { useReceiptCountQuery, IReceiptFilter, IReceiptStatus } from "../../generated/graphql";
import Spinner from "../Spinner/Spinner";

const filter: IReceiptFilter = {
  status: [
    IReceiptStatus.InProgress,
    IReceiptStatus.Generating,
    IReceiptStatus.Error,
  ],
};

interface ConfirmInvoiceProfileProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmInvoiceProfile = (props: ConfirmInvoiceProfileProps) => {
  const [show, setShow] = useState(false);
  const { loading, data } = useReceiptCountQuery({variables:{input: filter}});
  const { onConfirm, onCancel } = props;
  const totalCount = data?.receipts.totalCount;  

  useEffect(() => {
    if (totalCount && totalCount > 0) {
      setShow(true);
    } else if (totalCount && totalCount === 0) {
      onConfirm();
    }
    return () => {
      setShow(false);
    };
  }, [totalCount, onConfirm]);

  if(loading) return <Spinner />;

  return (
    <IonAlert
      isOpen={show}
      //onDidDismiss={() => setShow(false)}
      header={"Confirmar!"}
      message={`Tienes <strong>${data?.receipts.totalCount}</strong> recibos pendientes estos se van a generar con los nuevos datos!!!
      <br/>¿Estas seguro de modificar los datos fiscales?`}
      buttons={[
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            onCancel();
          },
        },
        {
          text: "Confirmar",
          handler: () => {
            onConfirm();
          },
        },
      ]}
    />
  );
};

export default ConfirmInvoiceProfile;