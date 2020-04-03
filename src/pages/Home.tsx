import { IonContent } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
      <IonContent>
        <ExploreContainer />
      </IonContent>
    
  );
};

export default Home;
