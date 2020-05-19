import React, { useState } from "react";
import { IonItem, IonLabel, IonToggle } from "@ionic/react";

interface InvoiceNotificationProps {
  onChange: (value: boolean) => void;
  checked?: boolean;
}

const InvoiceNotification: React.FC<InvoiceNotificationProps> = ({
  onChange,
  checked,
}) => {
  const [invoiceResult, setInvoiceResult] = useState<boolean | undefined>(
    checked
  );
  const handlerChange = (e: CustomEvent) => {
    switch (e.detail.value) {
      case "invoiceResult":
        onChange(e.detail.checked);
        setInvoiceResult(e.detail.checked);
        break;
    }
  };

  return (
    <IonItem>
      <IonLabel>
        <h3>Enviar notificaciones</h3>
        <p>Resultado de generacion de facturas</p>
      </IonLabel>
      <IonToggle
        value="invoiceResult"
        slot="end"
        checked={invoiceResult}
        onIonChange={handlerChange}
      />
    </IonItem>
  );
};

export default React.memo(InvoiceNotification);
