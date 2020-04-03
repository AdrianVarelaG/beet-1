import React from "react";
import { useHistory, useLocation } from "react-router";
import {
  IonItem,
  IonLabel,
  IonToggle,
  IonList,
  IonContent
} from "@ionic/react";

interface MenuSettingsProps {}

const MenuSettings: React.FC<MenuSettingsProps> = () => {
  const history = useHistory();
  const location = useLocation();

  const goToSetting = (setting: string) => () => {
    history.push(`${location.pathname}/${setting}`);
  };

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Enviar notificaciones</h3>
            <p>Resultado de generacion de facturas</p>
          </IonLabel>
          <IonToggle slot="end" />
        </IonItem>
        <IonItem button detail={false} onClick={goToSetting("receiver")}>
          <IonLabel>Perfil de facturacion</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default MenuSettings;
