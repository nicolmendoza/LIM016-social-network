// eslint-disable-next-line import/no-unresolved
import {
  getAuth,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  obtenerInfo, readPostProfile, leerPostProfile,
} from '../firebase.js';

export const Profile = () => {
  document.getElementById('container').innerHTML = '';
  const profile = document.createElement('div');
  profile.innerHTML = `
  <!-- <button id="home">Home</button> -->
  <div>Profile</div>
  <img id="photoUserProfile" width="100px">
  <div id="infoUserProfile"></div>
  <p id="aboutP"></p>
  <button id="goEdit">Edit Profile</button>
    <h1> MY POST</h1>
    <div id="PostProfile"></div>`;

  return document.getElementById('container').appendChild(profile);
};
export const FunctionProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  // autentificando usuario logueado

  readPostProfile(user.uid).then((docUser) => {
    document.getElementById('photoUserProfile').src = `${docUser.data().photo}`;
    const info = document.getElementById('infoUserProfile');
    info.innerHTML = `Bienvenida ${docUser.data().name}`;
    const aboutParrafo = document.getElementById('aboutP');
    aboutParrafo.innerHTML = `${docUser.data().about}`;
    console.log('Current data: ', docUser.data());
  });

  function showPostProfile(post) {
    const PostProfile = document.getElementById('PostProfile');
    const nuevoElemento = document.createElement('div');

    const postProfileAll = post.map((onePost) => {
      obtenerInfo(onePost.userID).then((dataUser) => {
        nuevoElemento.innerHTML += `<div class="postDiv">
      <div>${dataUser.data().name}</div>
      <div>${onePost.content}</div>
      <div>`;
      });
      return nuevoElemento;
    });
    Promise.all(postProfileAll).then(() => PostProfile.appendChild(nuevoElemento));
  }

  leerPostProfile(showPostProfile, auth.currentUser.uid);

  document.getElementById('goEdit').addEventListener('click', () => {
    window.location.hash = '#/editProfile';
    console.log('hi');
  });
};
