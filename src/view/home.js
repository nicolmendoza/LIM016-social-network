// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import {
  logout, savePost, showAbout, currentUser, readData,
} from '../firebase.js';

import { template } from './post.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <button id="logout">Log Out</button>
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

  if (userCurrent.displayName == null) {
    const info = document.getElementById('infoUser');
    info.innerHTML = 'Bienvenida Developer';
  } else {
    const info = document.getElementById('infoUser');
    info.innerHTML = `Bienvenida ${userCurrent.displayName}`;
  }
  document.getElementById('photoUser').src = `${userCurrent.photoURL}`;

  // read the posts
  readData(template);

  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;
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
  // document.getElementById('profile').addEventListener('click', () => {
  //   window.location.hash = '#/profile';
  // });
};
