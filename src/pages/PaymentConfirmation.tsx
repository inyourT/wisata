import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import "./PaymentMethod.css";

interface Package {
  name: string;
  price: number;
}

const PaymentMethod: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const selectedPackage = location.state as { name: string; price: number; postName: string };

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Fungsi untuk mengonfirmasi pembayaran
  const handlePayment = () => {
    if (selectedPayment) {
      // Tampilkan alert setelah pembayaran berhasil
      setShowAlert(true);
    } else {
      alert("Pilih metode pembayaran terlebih dahulu.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Metode Pembayaran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Card untuk menampilkan detail paket */}
        <IonCard>
          <IonCardContent>
            <h1>{selectedPackage.postName}</h1>
            <h2>{selectedPackage.name}</h2>
            <IonText>
              <p>Harga: Rp {selectedPackage.price.toLocaleString()}</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* Pilihan metode pembayaran */}
        <IonList>
          <IonText>
            <h2 className="ion-padding">Pilih Metode Pembayaran:</h2>
          </IonText>

          {/* Pilihan metode pembayaran */}
          <IonItem button onClick={() => setSelectedPayment("Transfer Bank")}>
            <IonLabel>Transfer Bank</IonLabel>
            {selectedPayment === "Transfer Bank" && <span>✓</span>}
          </IonItem>

          <IonItem button onClick={() => setSelectedPayment("Credit Card")}>
            <IonLabel>Credit Card</IonLabel>
            {selectedPayment === "Credit Card" && <span>✓</span>}
          </IonItem>

          <IonItem button onClick={() => setSelectedPayment("GoPay")}>
            <IonLabel>GoPay</IonLabel>
            {selectedPayment === "GoPay" && <span>✓</span>}
          </IonItem>

          <IonItem button onClick={() => setSelectedPayment("OVO")}>
            <IonLabel>OVO</IonLabel>
            {selectedPayment === "OVO" && <span>✓</span>}
          </IonItem>
        </IonList>

        {/* Tombol Konfirmasi Pembayaran */}
        <IonButton expand="block" color="primary" onClick={handlePayment}>
          Konfirmasi Pembayaran
        </IonButton>

        {/* Alert untuk notifikasi pembayaran berhasil */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Pembayaran Berhasil"
          message={`Pembayaran untuk ${selectedPackage.name} di ${selectedPackage.postName} menggunakan metode ${selectedPayment} berhasil!`}
          buttons={[
            {
              text: "OK",
              handler: () => {
                // Setelah OK, arahkan pengguna ke halaman konfirmasi atau halaman lain
                history.push("/PaymentConfirmation", {
                  paymentMethod: selectedPayment,
                  postName: selectedPackage.postName,
                  packageName: selectedPackage.name,
                  price: selectedPackage.price,
                });
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default PaymentMethod;
