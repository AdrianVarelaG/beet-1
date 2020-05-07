import React, { useRef, Fragment } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import gql from "graphql-tag";
import Receipt from "./Receipts/Receipt";
import { useUploadFileMutation } from "../generated/graphql";
import Spinner from "./Spinner/Spinner";

/*function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}*/

interface Props {
  icon: string;
  onFilePicker: () => void;
  //onFilePicker: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddReceiptFixedBottom = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [addFile, addFileResponse] = useUploadFileMutation();
  const { icon, onFilePicker } = props;
  const { loading, error, data } = addFileResponse;

  const onClickHandler = () => {
    inputRef.current!.click();
  };

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);

    if (event.target.files && event.target.files.length > 0) {
      const f = event.target.files![0];
      addFile({ variables: { file: f } });
      //onFilePicker(event);
      inputRef.current!.value = "";
    }
    /*  const file = event.target!.files![0];
    const fr = new FileReader();
    const name = file.name;
    
    fr.onload = () => {
      const data = fr.result!.toString();
      console.log(data);
      const b = dataURItoBlob(data);
      onFilePicker(b, name);
    };
    fr.readAsDataURL(file);*/
  };

  return (
    <Fragment>
      {loading && <Spinner/>}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <input
          ref={inputRef}
          hidden
          type="file"
          onChange={pickFileHandler}
          accept="image/*"
          capture="environment"
        />
        <IonFabButton onClick={onClickHandler}>
          <IonIcon icon={icon} />
        </IonFabButton>
      </IonFab>
    </Fragment>
  );
};

AddReceiptFixedBottom.fragment = gql`
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

/*

*/

export default AddReceiptFixedBottom;
