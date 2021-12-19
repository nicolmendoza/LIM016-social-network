import {
  readData,
  userDocRef,
  getUserDoc,
  updateUserDoc,
  getUnsubscribe,
  getUnsubscribeComments,
  getUnsubscribePostProfile,
  getDataPostType,
} from '../firebase/firestore.js';

import { template } from './templatePost.js';
import { logout } from '../firebase/firebase-auth.js';
import { templateUsers } from './templateUsers.js';
// eslint-disable-next-line import/named
import { newPost, functionNewPost } from './newPost.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('container-home');
  divElement.innerHTML = `
  <button id="btn-newPost" style="display:none"> Agregar publicación </button>

  <div class="section-home">

  <div id="section-User">
  <div id="infoUserHome">
  <div class='header-home'>
  <img id="photoUser" class="photoHome" width="100px">
  <div class="header-text">
    <h>Hola,</h>
    <p id="infoUser"></p>
  </div>
</div>
  </div>
  <div id="sectionUsers" >
  </div>
</div>

  <div id="showPost">
 </div>

<div class="sectionTypes">
  <div id="todos" >Ver todos</div>
  <div id="botones-types">

  <div class="div-type">
  <img class="img-preguntas img-types">
  <button value="preguntas" class="btn-type" >Preguntas</button>
  </div>

  <div class="div-type">
  <img class="img-preguntas img-types">
  <button value="trabajo"  class="btn-type"  >Oferta Laboral</button>
  </div>

  <div class="div-type">
  <img class="img-preguntas img-types">
  <button value="evento"  class="btn-type"  >Eventos</button>
  </div>

  <div class="div-type">
  <img class="img-preguntas img-types">
  <button value="curso"  class="btn-type"  >Cursos</button>
  </div>

  <div class="div-type">
  <img class="img-preguntas img-types">
  <button value="tutorial" class="btn-type"   >Tutorial</button>
  </div>
  
  </div>
  </div>

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
  templateUsers();
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

  document.querySelector('#botones-types').addEventListener('click', (e) => {
    const type = e.target.value;
    console.log(type);
    getDataPostType(template, type);
  });

  profileInfo();

  readData(template);

  document.getElementById('todos').addEventListener('click', () => {
    readData(template);
  });

  // LogOut
  window.addEventListener('click', (e) => {
    const btnOut = e.target.id;
    if (btnOut === 'out') {
      logout()
        .then(() => {
          const unsb = getUnsubscribe();
          unsb();
          const unsbComments = getUnsubscribeComments();
          unsbComments();
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
          const unsbComments = getUnsubscribeComments();
          unsbComments();
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
  const Unsubscribe = getUnsubscribePostProfile();
  Unsubscribe();
};
