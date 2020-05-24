import React from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonContent,
} from "@ionic/react";
import gql from "graphql-tag";
import {
  useGetMenuConfigQuery,
  useUpdateInvoiceResultNotificationMutation,
} from "../generated/graphql";
import ListLoading from "../components/Loading/components/ListLoading";
import InvoiceNotification from "../components/Settings/InvoiceNotification";

const SettingsMenu = () => {
  const { loading, error, data } = useGetMenuConfigQuery();
  const [
    updateInvoiceNotification,
  ] = useUpdateInvoiceResultNotificationMutation();

  const handlerChange = React.useCallback((value: boolean) => {
    updateInvoiceNotification({ variables: { input: value } });
  }, [updateInvoiceNotification]);

  if (loading)
    return (
      <IonContent>
        <ListLoading items={2}></ListLoading>
      </IonContent>
    );

  return (
    <IonContent>
      <IonList>
        <InvoiceNotification
          onChange={handlerChange}
          checked={data?.configuration?.notification?.invoiceResult}
        />
        <IonItem button detail={false} routerLink="/settings/receiver">
          <IonLabel>
            <h2>Perfil de facturacion</h2>
            {data?.configuration?.invoiceProfile?.rfc && (
              <p>{data?.configuration?.invoiceProfile?.rfc}</p>
            )}
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

SettingsMenu.fragment = gql`
  query getMenuConfig {
    configuration {
      notification {
        invoiceResult
      }
      invoiceProfile {
        rfc
      }
    }
  }
`;
SettingsMenu.updateNotification = gql`
  mutation updateInvoiceResultNotification($input: Boolean!) {
    updateNotificationInvoiceResult(input: $input) {
      success
      notification {
        invoiceResult
      }
    }
  }
`;

export default SettingsMenu;
