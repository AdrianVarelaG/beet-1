import React from 'react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <p>KEYCLOAK_URL: {(window as any)._env_?.KEYCLOAK_URL}</p>
      <p>KEYCLOAK_REALM: {(window as any)._env_?.KEYCLOAK_REALM}</p>
      <p>KEYCLOAK_CLIENT_ID: {(window as any)._env_?.KEYCLOAK_CLIENT_ID}</p>
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
