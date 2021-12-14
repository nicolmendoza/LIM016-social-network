import {
  logout,
  currentUser,
  readData,
  userDocRef,
  getUserDoc,
  setUserDoc,
  updateUserDoc,
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

  `;

  return document.getElementById('container').appendChild(divElement);
};

export const FunctionsHome = () => {
  readData(template);

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
        portada: 'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
      });
    } else {
      await setUserDoc(docRef, {
        name: nameUser,
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

  window.addEventListener('click', (e) => {
    const btnNewPost = e.target;
    if (btnNewPost.id === 'btn-newPost') {
      newPost();
      document.querySelector('.modalNewPost').style.display = 'flex';
      functionNewPost();
    } else if (btnNewPost.id === 'btn-post-mobile') {
      newPost();
      document.querySelector('.modalNewPost').style.display = 'flex';
      functionNewPost();
    }
  });
};
