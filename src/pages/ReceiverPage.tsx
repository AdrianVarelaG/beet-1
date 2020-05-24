import React, { useCallback, useState, useEffect } from "react";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import ReceiverForm from "../components/Settings/ReceiverForm";
import gql from "graphql-tag";
import {
  useGetInvoiceProfileQuery,
  useSetInvoiceProfileMutation,
  IInvoiceProfileInput,
  GetMenuConfigDocument,
  IGetMenuConfigQuery,
  ISetInvoiceProfileMutation,
  GetInvoiceProfileDocument,
} from "../generated/graphql";
import ConfirmInvoiceProfile from "../components/Settings/ConfirmInvoiceProfile";
import { useHistory } from "react-router";
import ReceiverLoading from "../components/Loading/ReceiverLoading";
import Spinner from "../components/Spinner/Spinner";

const ReceiverPage = () => {
  const { loading, data } = useGetInvoiceProfileQuery();
  const history = useHistory();
  const [
    setInvoiceProfile,
    { data: mutationData, loading: LoadingMutation },
  ] = useSetInvoiceProfileMutation({
    refetchQueries:[{query: GetInvoiceProfileDocument}],
    update: (store, { data }: { data: ISetInvoiceProfileMutation }) => {
      try {
        const configMenu = store.readQuery<IGetMenuConfigQuery>({
          query: GetMenuConfigDocument,
        });
        if (configMenu && configMenu.configuration &&  data?.updateInvoiceProfile?.invoiceProfile?.rfc) {
          const rfc: string = data.updateInvoiceProfile.invoiceProfile.rfc;
          const updateInvoiceProfile = {
            ...configMenu.configuration.invoiceProfile,
            rfc: rfc,
          };
          const updatedConfig = {
            ...configMenu.configuration,
            invoiceProfile: updateInvoiceProfile,
          };
          store.writeQuery<IGetMenuConfigQuery>({
            query: GetMenuConfigDocument,
            data: { ...configMenu, configuration: updatedConfig },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const [nextValue, setNextValue] = useState<IInvoiceProfileInput>();

  const success = mutationData?.updateInvoiceProfile?.success;

  useEffect(() => {
    if (success) {
      //console.log("Done" + mutationData.updateInvoiceProfile.success);
      history.replace("/settings");
    }
    return () => {
      setNextValue(undefined);
    };
  }, [success, history]);

  const onCancelHandler = useCallback(() => {
    console.log("On Cancel");
    setNextValue(undefined);
  }, []);

  const onConfirmHandler = useCallback(
    (value: IInvoiceProfileInput) => () => {
      console.log("On confirmed");
      setInvoiceProfile({ variables: { input: value } });
    },
    [setInvoiceProfile]
  );

  const updateHandler = useCallback((input: IInvoiceProfileInput) => {
    setNextValue(input);
  }, []);

  if (loading) return <ReceiverLoading />;

  return (
    <IonContent>
      {LoadingMutation && <Spinner />}
      {nextValue && (
        <ConfirmInvoiceProfile
          onCancel={onCancelHandler}
          onConfirm={onConfirmHandler(nextValue)}
        />
      )}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Datos fiscales</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ReceiverForm
            onSave={updateHandler}
            invoiceProfileInfo={data?.configuration?.invoiceProfile}
            routeCancel="/settings"
          />
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

ReceiverPage.fragment = gql`
  query getInvoiceProfile {
    configuration {
      invoiceProfile {
        ...InvoiceProfileInfo
      }
    }
  }
  ${ReceiverForm.fragment}
`;
ReceiverPage.invoicePending = gql`
  query ReceiptCount($input: ReceiptFilter) {
    receipts(input: $input) {
      totalCount
    }
  }
`;

ReceiverPage.profile = gql`
  mutation setInvoiceProfile($input: InvoiceProfileInput!) {
    updateInvoiceProfile(input: $input) {
      success
      invoiceProfile {
        rfc
      }
    }
  }
`;

export default ReceiverPage;
