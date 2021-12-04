// eslint-disable-next-line import/no-unresolved
import {
  getAuth,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import {
  logout, savePost, showAbout,
} from '../firebase.js';

import { display } from './post.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <button id="logout">Log Out</button>
  <button id="profile">Profile</button>
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
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    if (user.displayName == null) {
      const info = document.getElementById('infoUser');
      info.innerHTML = 'Bienvenida Developer';
    } else {
      const info = document.getElementById('infoUser');
      info.innerHTML = `Bienvenida ${user.displayName}`;
    }
    document.getElementById('photoUser').src = `${user.photoURL}`;
  }

  // read the posts
  display();

  const userID = auth.currentUser.uid;
  const nameUser = auth.currentUser.displayName;
  console.log(nameUser);
  // save the post , genera ID automatico
  const postDescription = document.getElementById('post-description');
  document.getElementById('btn').addEventListener('click', async () => {
    savePost(postDescription, userID, nameUser);
  });

  // LogOut
  document.querySelector('#logout').addEventListener('click', () => {
    logout();
  });

  // function show about
  const aboutParrafo = document.getElementById('aboutP');
  showAbout(aboutParrafo);

  // profile
  document.getElementById('profile').addEventListener('click', () => {
    window.location.hash = '#/profile';
  });
};
