import {
  logout,
  currentUser,
  readData,
  savePost,
  userDocRef,
  getUserDoc,
  setUserDoc,
  updateUserDoc,
} from '../firebase.js';

import { template } from './post.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('container-home');
  divElement.innerHTML = ` 
  <button id="logout"><ion-icon name="log-out-outline"></ion-icon></button>
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
  <div id="showPost"></div>`;

  return document.getElementById('container').appendChild(divElement);
};

export const FunctionsHome = () => {
  // autentificando usuario logueado
  const userCurrent = currentUser().currentUser;
  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;

  async function verificarSiExisteUsuario() {
    const docRef = userDocRef('usuarios', userID);
    const docSnap = await getUserDoc(docRef);

    if (docSnap.exists()) {
      console.log('existe');
    } else if (nameUser === null) {
      console.log(nameUser);
      await setUserDoc(docRef, {
        name: 'Developer',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
        userUID: userID,
        about: 'About',
      });
    } else {
      await setUserDoc(docRef, {
        name: nameUser,
        photo: userCurrent.photoURL,
        userUID: userID,
        about: 'About',
      });
      console.log('No existe');
    }
  }
  verificarSiExisteUsuario();

  async function profileInfo() {
    const docRef = userDocRef('usuarios', userID);
    const docSnap = await getUserDoc(docRef);

    if (docSnap.exists()) {
      const userInfo = docSnap.data();
      if (userInfo.name == null) {
        await updateUserDoc(docRef, {
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

  // save the post , genera ID automatico
  const postDescription = document.getElementById('post-description');
  document.getElementById('btn').addEventListener('click', () => {
    savePost(postDescription, userID, '');
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
