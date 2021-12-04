// eslint-disable-next-line import/no-unresolved
import {
  getAuth,
  updateProfile,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import {
//   getFirestore,
//   collection,
//   onSnapshot,
//   query,
//   where,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import { saveAbout, showAbout } from '../firebase.js';

export const Profile = () => {
  const divElementProfile = document.createElement('div');
  divElementProfile.innerHTML = `
  <button id="home">Home</button>
  <div>Profile</div>
  <img id="photoUserProfile" width="100px">
  <div id="infoUserProfile"></div>

  <p>Edita tu Nombre</p>
  <input type="text" id="name"  placeholder="Name" >
  <button id="btn-edit-name">click</button>

  <p>Edita tu about</p>
  <input type="text" id="about"  placeholder="about" >
  <button id="btn-edit-about">about</button>

  <p id="aboutP"></p>
    <h1> POST</h1>
    <div id="PostProfile"></div>`;

  return document.getElementById('container').appendChild(divElementProfile);
};

export const FunctionProfile = () => {
  const auth = getAuth();
  // const db = getFirestore();

  console.log(document.getElementById('PostProfile'));
  // autentificando usuario logueado
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    if (user.displayName == null) {
      const info = document.getElementById('infoUserProfile');
      info.innerHTML = 'Bienvenida Developer';
    } else {
      const info = document.getElementById('infoUserProfile');
      info.innerHTML = `Bienvenida ${user.displayName}`;
    }
    document.getElementById('photoUserProfile').src = `${user.photoURL}`;
  }

  // edit username
  document.getElementById('btn-edit-name').addEventListener('click', () => {
    const newName = document.getElementById('name');
    updateProfile(auth.currentUser, {
      displayName: newName.value,
    }).then(() => {
      const info = document.getElementById('infoUserProfile');
      info.innerHTML = `Bienvenida ${user.displayName}`;
    }).catch((error) => {
      console.log(error);
    });
  });

  const idUser = auth.currentUser.uid;
  // function show about
  // const aboutParrafo = document.getElementById('aboutP');
  showAbout(idUser);

  // actualizar about
  document.getElementById('btn-edit-about').addEventListener('click', () => {
    const About = document.getElementById('about').value;
    saveAbout(About);
    showAbout(idUser);
  });

  // function showPostProfile(post) {
  //   post.forEach((onePost) => {
  //     document.getElementById('PostProfile').innerHTML
  //     += `<div class="postDiv">
  //     <div>${onePost.userName}</div>
  //     <div>${onePost.content}</div>
  //     <div>`;
  //   });
  // }

  // const leerPostProfile = (callback) => {
  //   const q = query(collection(db, 'post'), where('userId', '==', `${auth.currentUser.uid}`));
  //   onSnapshot(q, (querySnapshot) => {
  //     console.log(document.getElementById('PostProfile'));
  //     document.getElementById('PostProfile').innerHTML = '';
  //     const postP = [];
  //     querySnapshot.forEach((doctP) => {
  //       const objectPost = { };
  //       objectPost.content = doctP.data().message;
  //       objectPost.userName = doctP.data().userName;
  //       postP.push(objectPost);
  //     });
  //     callback(postP);
  //   });
  // };
  // leerPostProfile(showPostProfile);

  document.getElementById('home').addEventListener('click', () => {
    window.location.hash = '#/home';
  });
};
