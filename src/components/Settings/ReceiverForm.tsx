import React from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import * as Yup from "yup";
import { saveSharp } from "ionicons/icons";
import { argsToArgsConfig } from "graphql/type/definition";
import TextInput from "../Form/TextInput";

type TForm = {
  rfc: string;
  razonSocial: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
  codigoPostal: number;
};

const ReceiverSchema = Yup.object().shape({
  rfc: Yup.string()
    .matches(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})$/, {
      message: "Formato no valido, usar: XXXXAAMMDDXXX",
    })
    .required("El RFC es obligatorio"),
  razonSocial: Yup.string().required("La razon social es obligatoria"),
  codigoPostal: Yup.string()
    .matches(/^[0-9]{5}$/, {
      message: "Formato no valido"
    })
});

interface ReceiverFormProps {}

const ReceiverForm: React.FC<ReceiverFormProps> = () => {
  const { handleSubmit, control, errors } = useForm<TForm>({
    validationSchema: ReceiverSchema,
  });

  const onSubmit = (data: TForm) => console.log(data);

  console.log(errors);
  //color={errors.rfc? "danger": ""}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol>
            <TextInput
              control={control}
              name="rfc"
              title="RFC"
              error={errors.rfc}
              onChange={([selected]) => {
                if (selected && selected.detail.value)
                  return selected.detail.value.toString().toUpperCase();
                return selected.detail.value;
              }}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <TextInput
              control={control}
              name="razonSocial"
              title="RAZON SOCIAL"
              error={errors.razonSocial}
            />
          </IonCol>
        </IonRow>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Direccion</IonLabel>
          </IonItemDivider>
          <IonRow>
            <IonCol>
              <TextInput
                control={control}
                name="calle"
                title="CALLE"
                error={errors.calle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <TextInput
                control={control}
                name="numeroExterior"
                title="NUMERO EXTERIOR"
                error={errors.numeroExterior}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <TextInput
                control={control}
                name="numeroInterior"
                title="NUMERO INTERIOR"
                error={errors.numeroInterior}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <TextInput
                control={control}
                name="colonia"
                title="COLONIA"
                error={errors.colonia}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <TextInput
                control={control}
                name="codigoPostal"
                title="CODIGO POSTAL"
                error={errors.codigoPostal}
              />
            </IonCol>
          </IonRow>
        </IonItemGroup>

        <IonRow className="ion-margin-top ion-text-center">
          <IonCol
            sizeSm="3"
            size="12"
            offsetSm="1"
            className="ion-hide-sm-down"
          >
            <IonButton color="dark" expand="block" fill="outline">
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol sizeSm="3" size="12" offsetSm="4">
            <IonButton color="secondary" expand="block" type="submit">
              <IonIcon icon={saveSharp} slot="start" />
              Guardar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default ReceiverForm;
