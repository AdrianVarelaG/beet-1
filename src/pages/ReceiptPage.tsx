import React, { useState, Fragment, useCallback } from "react";
import { IonContent, IonToast, IonCard, IonCardContent } from "@ionic/react";
import gql from "graphql-tag";
import { add } from "ionicons/icons";
import Receipts from "../components/Receipts/Receipts";
import TextFilter from "../components/TextFilter/TextFilter";
import AddReceiptFixedBottom from "../components/AddReceiptFixedBottom";
import {
  useReceiptListQuery,
  IUploadFileMutation,
  ReceiptListDocument,
  useUploadFileMutation,
} from "../generated/graphql";
import { DocumentNode } from "graphql";
import Receipt from "../components/Receipts/Receipt";
import Spinner from "../components/Spinner/Spinner";
import ReceiptLoading from "../components/Receipts/ReceiptLoading";

const ReceiptPage: React.FC & {
  fragment: DocumentNode;
  addReceipt: DocumentNode;
} = () => {
  const handlerComplete = (data: IUploadFileMutation) => {
    setMessage("Recibo agregado de manera correcta");
  };
  const [filter, setFilter] = useState("");
  const { loading, error, data, refetch } = useReceiptListQuery({
    variables: { filter },
  });
  const [message, setMessage] = useState("");
  const [addFile, addFileResponse] = useUploadFileMutation({
    onCompleted: handlerComplete,
    refetchQueries: [{ query: ReceiptListDocument, variables: { filter } }],
  });
  const {
    loading: loadingMutation,
    error: errorMutation,
    data: dataMutation,
  } = addFileResponse;

  console.log("rendering");
  console.log(data);

  const addReceipt = useCallback(
    async (file: File) => {
      addFile({ variables: { file: file } });
    },
    [addFile]
  );

  const newFilterHandler = async (f: string) => {
    try {
      setFilter(f);
      await refetch({ filter: f });
    } catch (error) {
      console.log(error);
    }
  };

  let content = (
    <Fragment>
      <Receipts receipts={data} />
      <AddReceiptFixedBottom icon={add} onFilePicker={addReceipt} />
    </Fragment>
  );

  if (loading) {
    content = (
      <IonCard className="ion-no-margin ion-margin-start ion-margin-end">
        <IonCardContent className="ion-no-padding">
          <ReceiptLoading />
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <Fragment>
      {loadingMutation && <Spinner />}
      <TextFilter isError={!!error} onChange={newFilterHandler} />
      <IonContent>{content}</IonContent>
      <IonToast
        color="dark"
        isOpen={!!message}
        message={message}
        duration={3000}
        onDidDismiss={() => setMessage("")}
      />
    </Fragment>
  );
};

ReceiptPage.fragment = gql`
  query ReceiptList($filter: String) {
    ...ReceiptsList
  }
  ${Receipts.fragment}
`;
ReceiptPage.addReceipt = gql`
  mutation uploadFile($file: Upload!) {
    createReceipt(file: $file) {
      success
      receipt {
        ...ReceiptDataList
      }
    }
  }
  ${Receipt.fragment}
`;

export default ReceiptPage;

//Add for show the ticket in the screen.
/*const fileUploadHandler = (file: Blob, name: string) => {

    (file as any).name = name;
    addFile({variables: {file}});
    
  }*/
