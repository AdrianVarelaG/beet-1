import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import { AuthContext } from "../context/auth-context";

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {

  const authContext = useContext(AuthContext);

  useEffect(() =>{
    authContext.logout!();
  }, [authContext.logout])

  return (
    <IonPage>
      <IonContent>
        <Redirect to="/home">
          </Redirect>
      </IonContent>
    </IonPage>
  );
};

export default Logout;
