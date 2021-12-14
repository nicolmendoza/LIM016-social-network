// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import {
  doc, setDoc, getDoc, getFirestore, updateDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import {
  logout, currentUser, readData, savePost,
} from '../firebase.js';

import { template } from './post.js';

import { newPost, functionNewPost } from './newPost.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('container-home');
  divElement.innerHTML = ` 
  <div class='header-home'>
    <img id="photoUser" class="photoHome" width="100px">
    <div class="header-text">
      <h>Hello,</h>
      <p id="infoUser"></p>
    </div>
  </div>

  <button id="btn-newPost"> + Create a post </button>
  
  <p id="aboutP"></p>

 <div id="showPost">
 </div>

 <section class="modalNewPost" style="display: none">
      <div class="modalDivPost"> 
      <div class="modalContainer-NewPost">
      </div>
      </div>
  </section>

  `;

  return document.getElementById('container').appendChild(divElement);
};

export const FunctionsHome = () => {
  // autentificando usuario logueado
  const userCurrent = currentUser().currentUser;
  console.log(userCurrent.uid);

  const db = getFirestore();
  async function verificarSiExisteUsuario() {
    const docRef = doc(db, 'usuarios', userCurrent.uid);
    const docSnap = await getDoc(docRef);
    const name = userCurrent.displayName;
    if (docSnap.exists()) {
      console.log('existe');
    } else if (name === null) {
      await setDoc(doc(db, 'usuarios', userCurrent.uid), {
        name: 'Developer',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
        userUID: userCurrent.uid,
        about: 'About',
        portada: 'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
      });
    } else {
      await setDoc(doc(db, 'usuarios', userCurrent.uid), {
        name: userCurrent.displayName,
        photo: userCurrent.photoURL,
        userUID: userCurrent.uid,
        about: 'Escribe una frase con la que te identifiques',
        portada: 'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
        career: 'Cuentanos a que te dedicas',
      });
      console.log('No existe');
    }
  }
  verificarSiExisteUsuario();

  // saveUser();

  async function profileInfo() {
    const docRef = doc(db, 'usuarios', userCurrent.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userInfo = docSnap.data();
      if (userInfo.name == null) {
        await updateDoc(docRef, {
          name: 'Developer',
        });
      }
      const info = document.getElementById('infoUser');
      info.innerHTML = `${userInfo.name}`;
      document.getElementById('photoUser').src = `${userInfo.photo}`;
    }

    console.log(docSnap.data());
  }

  profileInfo();
  // read the posts
  readData(template);

  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;
  console.log(nameUser);

  // save the post , genera ID automatico
  // const postDescription = document.getElementById('post-description');
  // document.getElementById('btn').addEventListener('click', () => {
  //   savePost(postDescription, userID, '');
  // });

  // LogOut
  window.addEventListener('click', (e) => {
    const btnOut = e.target.id;
    if (btnOut === 'out') {
      logout()
        .then(() => {
          console.log('log out');
          window.location.hash = '#/';
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (btnOut === 'logout-mob') {
      logout()
        .then(() => {
          console.log('log out');
          window.location.hash = '#/';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  // Crear nuevo post

  document.getElementById('btn-newPost').addEventListener('click', () => {
    newPost();
    document.querySelector('.modalNewPost').style.display = 'flex';
    functionNewPost();
  });
};
