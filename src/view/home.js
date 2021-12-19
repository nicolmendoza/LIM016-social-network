import {
  readData,
  userDocRef,
  getUserDoc,
  updateUserDoc,
  getUnsubscribe,
} from '../firebase/firestore.js';

import { template } from './templatePost.js';
import { logout } from '../firebase/firebase-auth.js';

// eslint-disable-next-line import/named
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
  <button id="btn-newPost" style="display:none"> Add New Post </button>
  <p id="aboutP"></p>
  <div id="showPost">
 </div>
 <section class="modalNewPost" style="display: none">
      <div class="modalDivPost">
      <div class="modalContainer-NewPost">
      </div>
      </div>
  </section>
  <section class="modalDelete" style="display: none">
    <div class="modalDivDelete">
    <div class="modalContainer-Delete">
      <div id="closeDelete">
        <i class="far fa-times-circle"></i>
      </div>
      <div>
        <h1>Eliminar publicación</h1>
        <div class="modal-parrafo">
          ¿Estás seguro que quieres eliminar esta publicación de <b class="emailText">Queen Coders</b> para siembre?
        </div>
        <button class="aceptDelete">ELIMINAR</button>
      </div>
    </div>
    </div>
  </section>
  `;
  return document.querySelector('#container').appendChild(divElement);
};
export const FunctionsHome = () => {
  // autentificando usuario logueado
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  // const userCurrent = currentUser().currentUser;
  const userID = userCurrent.uid;
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

  readData(template);
  // LogOut
  window.addEventListener('click', (e) => {
    const btnOut = e.target.id;
    if (btnOut === 'out') {
      logout()
        .then(() => {
          const unsb = getUnsubscribe();
          unsb();
          console.log('log out');
          window.location.hash = '#/';
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (btnOut === 'logout-mob') {
      logout()
        .then(() => {
          const unsb = getUnsubscribe();
          unsb();
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
  document.getElementById('btn-post-mobile').addEventListener('click', () => {
    newPost();
    document.querySelector('.modalNewPost').style.display = 'flex';
    functionNewPost();
  });

  // Ocultar modal delete
  document.querySelector('#closeDelete').addEventListener('click', () => {
    document.querySelector('.modalDelete').classList.remove('revelar');
  });
};
