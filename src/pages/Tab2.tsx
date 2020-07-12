import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Here1 from '../components/Here1'
import setOrientation from '../components/orientation'

const Tab2: React.FC = () => {
    useEffect(() => {
        setOrientation()
    }, []);

    return (
        <IonPage>
            <Here1 />
        </IonPage>
    );
};

export default Tab2;
