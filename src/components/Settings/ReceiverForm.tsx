import React, { useEffect } from "react";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonLabel,
  IonIcon,
  IonButton,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { saveSharp } from "ionicons/icons";
import TextInput from "../Form/TextInput";
import gql from "graphql-tag";
import {
  IInvoiceProfileInfoFragment,
  IInvoiceProfileInput,
} from "../../generated/graphql";

type TForm = {
  rfc: string;
  razonSocial: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  colonia?: string;
  codigoPostal?: string;
};

const ReceiverSchema = Yup.object().shape({
  rfc: Yup.string()
    .matches(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})$/, {
      message: "Formato no valido, usar: XXXXAAMMDDXXX",
    })
    .required("El RFC es obligatorio"),
  razonSocial: Yup.string().required("La razon social es obligatoria"),
  codigoPostal: Yup.string().required("Codigo postal es obligatorio").matches(/^[0-9]{5}$/, {
    message: "Formato no valido",
  }),
});

const toTFormData = (
  invoiceProfileInfo?: IInvoiceProfileInfoFragment | null
): TForm => {
  if (invoiceProfileInfo) {
    const ret: TForm = {
      rfc: invoiceProfileInfo.rfc,
      razonSocial: invoiceProfileInfo.razonSocial,
    };
    if (invoiceProfileInfo.direccion) {
      const dir = invoiceProfileInfo.direccion;
      ret.calle = dir.calle ? dir.calle : undefined;
      ret.numeroExterior = dir.numeroExterior ? dir.numeroExterior : undefined;
      ret.numeroInterior = dir.numeroInterior ? dir.numeroInterior : undefined;
      ret.colonia = dir.colonia ? dir.colonia : undefined;
      ret.codigoPostal = dir.codigoPostal ? dir.codigoPostal : undefined;
    }

    return ret;
  }
  return {
    rfc: "",
    razonSocial: "",
  };
};

const toIInvoiceProfileInput = (input: TForm): IInvoiceProfileInput => {
  const ret: IInvoiceProfileInput = {
    rfc: input.rfc,
    razonSocial: input.razonSocial,
  };

  if (
    input.calle ||
    input.numeroExterior ||
    input.numeroInterior ||
    input.colonia ||
    input.codigoPostal
  ) {
    ret.direccion = {
      calle: input.calle,
      numeroExterior: input.numeroExterior,
      numeroInterior: input.numeroInterior,
      colonia: input.colonia,
      codigoPostal: input.codigoPostal,
    };
  }

  return ret;
};

interface ReceiverFormProps {
  onSave: (input: IInvoiceProfileInput) => void;
  invoiceProfileInfo?: IInvoiceProfileInfoFragment | null;
  routeCancel: string;
}

const ReceiverForm = (props: ReceiverFormProps) => {
  const { handleSubmit, control, errors, reset } = useForm<TForm>({
    validationSchema: ReceiverSchema,
    //defaultValues: toTFormData(props.invoiceProfileInfo)
  });
  const { routeCancel, onSave } = props;

  useEffect(() => {
    reset(toTFormData(props.invoiceProfileInfo));
  }, [props.invoiceProfileInfo, reset]);

  const onSubmit = (data: TForm) => {
    onSave(toIInvoiceProfileInput(data));
    //history.push(routeCancel);
  };

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
            <IonButton
              color="dark"
              expand="block"
              fill="outline"
              routerLink={routeCancel}
            >
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

ReceiverForm.fragment = gql`
  fragment InvoiceProfileInfo on InvoiceProfile {
    rfc
    razonSocial
    direccion {
      calle
      numeroExterior
      numeroInterior
      colonia
      codigoPostal
    }
  }
`;

export default ReceiverForm;
