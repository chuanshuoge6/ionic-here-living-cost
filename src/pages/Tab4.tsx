import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Here3 from '../components/Here3'
import setOrientation from '../components/orientation'

const Tab4: React.FC = () => {
    useEffect(() => {
        setOrientation()
    }, []);

    return (
        <IonPage>
            <Here3 />
        </IonPage>
    );
};

export default Tab4;
