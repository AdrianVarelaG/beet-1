import React, { useState } from "react";
import Keycloak from "keycloak-js";

interface IAuthProvider{
  keycloak: Keycloak.KeycloakInstance;
}

interface IAuthContext extends IAuthProvider {
  logout: () => void;
  //login: (kc: Keycloak.KeycloakInstance) => void;
}

export const AuthContext = React.createContext<Partial<IAuthContext>>({});


const AuthContextProvider: React.FC<IAuthProvider> = props => { 
  const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance| undefined>(props.keycloak);

  const logoutHandler = () =>{
    keycloak?.logout();
    setKeycloak(undefined);
  }

  return (
    <AuthContext.Provider value={ {keycloak: keycloak, logout:logoutHandler} }>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;