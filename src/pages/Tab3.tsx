import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Here2 from '../components/Here2'
import setOrientation from '../components/orientation'

const Tab3: React.FC = () => {
    useEffect(() => {
        setOrientation()
    }, []);

    return (
        <IonPage>
            <Here2 />
        </IonPage>
    );
};

export default Tab3;
