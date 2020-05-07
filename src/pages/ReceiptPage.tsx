import React, { useState, Fragment } from "react";
import { IonContent } from "@ionic/react";
import gql from "graphql-tag";
import { add } from "ionicons/icons";
import Receipts from "../components/Receipts/Receipts";
import TextFilter from "../components/TextFilter/TextFilter";
import AddReceiptFixedBottom from "../components/AddReceiptFixedBottom";
import { useReceiptListQuery } from "../generated/graphql";
import { DocumentNode } from "graphql";

const ReceiptPage: React.FC & { fragment: DocumentNode } = () => {
  const [filter, setFilter] = useState("");
  const { loading, error, data, refetch } = useReceiptListQuery({
    variables: { filter },
  });

  //const [addFile, addFileInfo] = useMutation(UPLOAD_FILE);
/*
  const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files![0];
    addFile({ variables: { file: f } });
  };
*/
  const addReceipt = async () => {
    
  } 

  const newFilterHandler = async (f: string) => {
    try {
      setFilter(f);
      await refetch({ filter: f });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Fragment>
      <TextFilter isError={!!error} onChange={newFilterHandler} />
      <IonContent>
        <Receipts loading={loading} error={!!error} receipts={data} />
        <AddReceiptFixedBottom icon={add} onFilePicker={addReceipt} />
      </IonContent>
    </Fragment>
  );
};

ReceiptPage.fragment = gql`
  query ReceiptList($filter: String) {
    ...ReceiptsList
  }
  ${Receipts.fragment}
`;

export default ReceiptPage;

//Add for show the ticket in the screen.
/*const fileUploadHandler = (file: Blob, name: string) => {

    (file as any).name = name;
    addFile({variables: {file}});
    
  }*/
