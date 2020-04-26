import React, { useRef } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

interface AddReceiptFixedBottomProps {
  icon: string;
  onFilePicker : (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AddReceiptFixedBottom: React.FC<AddReceiptFixedBottomProps> = ({
  icon,
  onFilePicker
}) => {
  const inputRef = useRef<HTMLInputElement>(null); 

  const onClickHandler = () => {
    inputRef.current!.click();
  }

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={onClickHandler}>
        <input ref={inputRef} hidden type="file" onChange={onFilePicker}/>
        <IonIcon icon={icon} />
      </IonFabButton>
    </IonFab>
  );
};

export default AddReceiptFixedBottom;
