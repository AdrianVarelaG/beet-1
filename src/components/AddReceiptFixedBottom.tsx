import React, { useRef } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

function dataURItoBlob(dataURI: string) {
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
}

interface AddReceiptFixedBottomProps {
  icon: string;
  //onFilePicker: (info: Blob, name: string) => void;
  onFilePicker: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddReceiptFixedBottom: React.FC<AddReceiptFixedBottomProps> = ({
  icon,
  onFilePicker,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    inputRef.current!.click();
  };

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilePicker(event);
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
  );
};

export default AddReceiptFixedBottom;
