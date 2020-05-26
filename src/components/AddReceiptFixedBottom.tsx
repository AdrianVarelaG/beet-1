import React, { useRef, Fragment } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

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
  onFilePicker: (file: File) => void;
}

const AddReceiptFixedBottom = (props: Props) => {
  const { icon, onFilePicker } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickHandler = () => {
    inputRef.current!.click();
  };

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      const f = event.target.files![0];
      onFilePicker(f);
      inputRef.current!.value = "";
    }
    
  };

  return (
    <Fragment>
      <IonFab vertical="bottom" horizontal="end" slot="fixed" >
        <input
          ref={inputRef}
          hidden
          type="file"
          onChange={pickFileHandler}
          accept="image/*"
          capture="environment"
        />
        <IonFabButton onClick={onClickHandler} color="secondary">
          <IonIcon icon={icon} />
        </IonFabButton>
      </IonFab>
    </Fragment>
  );
};

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

export default React.memo(AddReceiptFixedBottom);
