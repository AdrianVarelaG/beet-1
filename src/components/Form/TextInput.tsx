import React from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { Controller, Control, FieldError } from "react-hook-form";

interface TextInputProps {
  control: Control;
  name: string;
  title: string;
  required?: boolean;
  error?: FieldError;
  onChange?: (event: any) => any;
}

const TextInput: React.FC<TextInputProps> = ({
  control,
  name,
  title,
  error,
  onChange,
}) => {
  return (
    <IonGrid class="ion-no-padding">
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">{title}</IonLabel>
            <Controller
              as={<IonInput></IonInput>}
              name={name}
              control={control}
              onChangeName="onIonChange"
              onChange={onChange}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {error && <IonLabel color="danger">{error.message}</IonLabel>}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TextInput;
