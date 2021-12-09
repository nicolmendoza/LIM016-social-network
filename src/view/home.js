// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import {
  doc, setDoc, getDoc, getFirestore, updateDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import {
  logout, savePost, showAbout, currentUser, readData,
} from '../firebase.js';

import { template } from './post.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <button id="logout">Log Out</button>
  <button id="prueba">PRUEBA</button>
  <!-- <button id="profile">Profile</button> -->
  <div>WELCOME</div>
  <img id="photoUser" width="100px">
  <div id="infoUser"></div>
  <p id="aboutP"></p>

<h1>Add POST</h1>
<input type="text" id="post-description"  placeholder="about" >
 <button id="btn" >Save</button>
 <div id="showPost">
 </div>

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

    if (docSnap.exists()) {
      console.log('existe');
    } else {
      await setDoc(doc(db, 'usuarios', userCurrent.uid), {
        name: userCurrent.displayName,
        photo: userCurrent.photoURL,
        userUID: userCurrent.uid,
        about: 'About',
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
      info.innerHTML = `Bienvenida ${userInfo.name}`;
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
  const postDescription = document.getElementById('post-description');
  document.getElementById('btn').addEventListener('click', async () => {
    savePost(postDescription, userID);
  });

  // LogOut
  document.querySelector('#logout').addEventListener('click', () => {
    logout();
  });

  // function show about
  const aboutParrafo = document.getElementById('aboutP');
  showAbout(aboutParrafo);
};
