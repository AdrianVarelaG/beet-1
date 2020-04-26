import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { add } from "ionicons/icons";
import Receipts, { Receipt } from "../components/Receipts/Receipts";
import TextFilter from "../components/TextFilter/TextFilter";
import AddReceiptFixedBottom from "../components/AddReceiptFixedBottom";

interface ReceiptList {
  receipts: Receipt[];
}

interface ReceiptListVars {
  filter: string;
}

const ReceiptPage: React.FC = () => {
  const [filter, setFilter] = useState("");
  const { loading, error, data, refetch } = useQuery<
    ReceiptList,
    ReceiptListVars
  >(GET_RECEIPTS, { variables: { filter } });
  const [addFile, addFileInfo] = useMutation(UPLOAD_FILE);

  const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files![0];
    addFile({variables: {file: f}})
  }
  
  const newFilterHandler = async (f: string) => {
    try {
      setFilter(f);
      await refetch({ filter: f });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(loading, data, error);

  return (
    <IonContent>
      <TextFilter isError={!!error} onChange={newFilterHandler} />
      <Receipts
        loading={loading}
        error={!!error}
        receipts={data?.receipts.map((r) => ({
          id: r.id,
          amount: r.amount,
          business: r.business,
          createdDate: r.createdDate,
          status: r.status,
          date: r.date
        }))}
      />
      <AddReceiptFixedBottom icon={add} onFilePicker={fileUploadHandler}/>
    </IonContent>
  );
};

const GET_RECEIPTS = gql`
  query ReceiptList($filter: String) {
    receipts(filter: $filter) {
      id
      business
      createdDate
      amount
      status
      date
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    createReceipt(file: $file) {
      success
    }
  }
`;

export default ReceiptPage;
