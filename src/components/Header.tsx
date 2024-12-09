import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Header: React.FC= () => {
    return (
        <IonHeader mode='ios'>
            <IonToolbar mode='ios'>
                <IonTitle>Info Wisata</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;