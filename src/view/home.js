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

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('container-home');
  divElement.innerHTML = ` 
  <button id="logout"><ion-icon name="log-out-outline"></ion-icon></button>
  <!-- <button id="profile">Profile</button> -->
  <div class='header-home'>
    <img id="photoUser" class="photoHome" width="100px">
    <div class="header-text">
      <h>Hello,</h>
      <p id="infoUser"></p>
    </div>
  </div>
  
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
    const name = userCurrent.displayName;
    if (docSnap.exists()) {
      console.log('existe');
    } else if (name === null) {
      await setDoc(doc(db, 'usuarios', userCurrent.uid), {
        name: 'Developer',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
        userUID: userCurrent.uid,
        about: 'About',
      });
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
  const postDescription = document.getElementById('post-description');
  document.getElementById('btn').addEventListener('click', () => {
    savePost(postDescription, userID);
  });

  // LogOut
  document.querySelector('#logout').addEventListener('click', () => {
    logout()
      .then(() => {
        console.log('log out');
        window.location.hash = '#/';
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
