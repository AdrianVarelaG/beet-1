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
} from "../generated/graphql";
import ConfirmInvoiceProfile from "../components/Settings/ConfirmInvoiceProfile";
import { useHistory } from "react-router";

const ReceiverPage = () => {
  const { loading, data } = useGetInvoiceProfileQuery();
  const history = useHistory();
  const [setInvoiceProfile, {data: mutationData}] = useSetInvoiceProfileMutation({
    refetchQueries: [{ query: GetMenuConfigDocument }],
  });
  const [nextValue, setNextValue] = useState<IInvoiceProfileInput>();

  const success = mutationData?.updateInvoiceProfile?.success;

  useEffect( () => {
    if(success){
      //console.log("Done" + mutationData.updateInvoiceProfile.success);
      history.replace("/settings");
    }
    return () =>{
      setNextValue(undefined);
    }
  },[success, history] )

  const onCancelHandler = useCallback(() => {
    console.log("On Cancel");
    setNextValue(undefined);
  }, []);

  const onConfirmHandler = useCallback((value: IInvoiceProfileInput) =>() => {
    console.log("On confirmed");
    setInvoiceProfile({ variables: { input: value } });
  }, [setInvoiceProfile]);

  const updateHandler = useCallback((input: IInvoiceProfileInput) => {
    setNextValue(input);
  }, []);

  return (
    <IonContent>
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
    }
  }
`;

export default ReceiverPage;
