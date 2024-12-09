import { IonCard, IonCardContent, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useState } from 'react';
import {motion} from 'framer-motion';
import './Home.css';
import Header from '../components/Header';
import KwImage from '../assets/img/Kw.jpg';

interface Post {
  id: string,
  image: string,
  name: string,
  title: string,
  packages: { name: string, price: number }[],
}

const Home: React.FC = () => {

  const posts: Post[] = [
    {
      id: '1',
      image: KwImage,
      name: "Kawah Putih",
      title: "Kawah Putih adalah sebuah tempat wisata di Jawa Barat yang terletak di Desa Alam Endah, Kecamatan Rancabali, Kabupaten Bandung Jawa Barat yang terletak di kaki Gunung Patuha. Kawah putih merupakan sebuah danau yang terbentuk dari letusan Gunung Patuha.",
      packages: [
        { name: 'Paket Hemat', price: 20000 },
        { name: 'Paket Lengkap', price: 350000 },
      ],
    },
  ]
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className='content-container'>

          <IonList className="ion-no-padding">
            {
              posts.map((post) => 
                <IonItem key={'card-' + post.id} mode="ios" lines="none" className="ion-no-padding ion-no-inner-padding">
                <IonCard className="ion-no-padding" onClick={() => setSelectedPost(post)}>
                  <motion.div className="card-content" layoutId={'card-'+post.id}>
                    <motion.div layoutId={'image-container'+post.id}>
                    <IonImg className="card-image" src={post.image}/>
                    </motion.div>
                    <IonCardContent>
                      <motion.div variants={{
                        show:{
                          opacity: 1,
                          transition: {
                            duration:0.5,
                            delay: 0.3
                          }
                        },
                         hidden: {
                          opacity: 0,
                          transition: {
                            duration: 0.1
                          }
                         }
                      }}
                      initial="show"
                      animate={selectedPost?.id == post.id ? 'hidden' : 'show'}
                      className="title-container">
                        <IonText>{post.name}</IonText>
                      </motion.div>
                    </IonCardContent>
                  </motion.div>
                </IonCard>
              </IonItem>
              )
            }
          </IonList>

          {
            selectedPost && 
          <motion.div layoutId={'card-'+selectedPost.id}
          initial={{opacity:0}}
          animate={{opacity:1}}
          className="popup-container" 
          onClick={() => setSelectedPost(undefined)}>
            <motion.div layoutId={'image-container'+selectedPost.id}>
              <IonImg src={selectedPost.image}></IonImg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, transform:'translateY(20px)'}}
              animate={{ opacity: 1, transform: 'translateY(0)', transitionDuration: '0.5s', transitionDelay: '0.2s'}}>
              <h1>{selectedPost.name}</h1>
            </motion.div>
            <IonText>
              <p>{selectedPost.title}</p>
              <IonButton fill="clear" expand="block" routerLink={{ pathname: '/Order', state: selectedPost }}>Order Now</IonButton>
            </IonText>
          </motion.div>
          }


        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
