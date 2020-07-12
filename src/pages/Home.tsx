import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Here from '../components/Here'
import setOrientation from '../components/orientation'

const Home: React.FC = () => {
  useEffect(() => {
    setOrientation()
  }, []);

  return (
    <IonPage>
      <Here />
    </IonPage>
  );
};

export default Home;
