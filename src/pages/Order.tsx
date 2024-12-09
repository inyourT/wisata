import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import "./Order.css";

interface Package {
  name: string;
  price: number;
}

interface Post {
  id: string;
  name: string;
  title: string;
  image: string;
  packages: Package[];
}

const Order: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const selectedPost = location.state as Post;

  if (!selectedPost) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Order Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonText className="ion-padding">
            <p>Tidak ada data yang dipilih. Silakan kembali ke halaman utama.</p>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  const handleOrder = (pkg: Package) => {
    // Navigasi ke halaman metode pembayaran, membawa data paket yang dipilih
    history.push({
      pathname: "/PaymentMethod",
      state: { ...pkg, postName: selectedPost.name }, // Mengirim nama post dan paket ke halaman berikutnya
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Card untuk detail wisata */}
        <IonCard>
          <IonCardContent>
            <div className="order-image-container">
              <img
                src={selectedPost.image}
                alt={selectedPost.name}
                className="order-image"
              />
            </div>
            <h1>{selectedPost.name}</h1>
            <IonText>
              <p>{selectedPost.title}</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* List Paket */}
        <IonList>
          <IonText>
            <h2 className="ion-padding">Pilih Paket:</h2>
          </IonText>
          {selectedPost.packages.map((pkg, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h3>{pkg.name}</h3>
                <p>Harga: Rp {pkg.price.toLocaleString()}</p>
              </IonLabel>
              <IonButton
                slot="end"
                fill="solid"
                color="primary"
                onClick={() => handleOrder(pkg)}
              >
                Order
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Order;
