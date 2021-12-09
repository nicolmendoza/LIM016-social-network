// eslint-disable-next-line import/no-unresolved
import {
  getAuth,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  doc,
  getFirestore,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  obtenerInfo,
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

  const db = getFirestore();

  document.getElementById('photoUserProfile').src = user.photoURL;
  (async () => {
    const docRef = doc(db, 'usuarios', user.uid);
    const docSnap = await getDoc(docRef);
    const docUser = docSnap.data();
    console.log(docUser);
    const info = document.getElementById('infoUserProfile');
    info.innerHTML = `Bienvenida ${docUser.name}`;
    const aboutParrafo = document.getElementById('aboutP');
    aboutParrafo.innerHTML = `${docUser.about}`;
    console.log('Current data: ', docUser);
  })();

  function showPostProfile(post) {
    console.log(post);
    const PostProfile = document.getElementById('PostProfile');
    const nuevoElemento = document.createElement('div');

    const postProfileAll = post.map(async (onePost) => {
      const dataUser = await obtenerInfo(onePost.userID);
      nuevoElemento.innerHTML += `<div class="postDiv">
      <div>${dataUser.name}</div>
      <div>${onePost.content}</div>
      <div>`;
    });
    Promise.all(postProfileAll).then(() => PostProfile.appendChild(nuevoElemento));
  }

  const leerPostProfile = async (callback) => {
    const q = query(collection(db, 'post'), where('userId', '==', `${auth.currentUser.uid}`));
    const querySnapshot = await getDocs(q);
    const postP = [];
    querySnapshot.forEach((doctP) => {
      const objectPost = { };
      console.log(doctP.data());
      objectPost.content = doctP.data().message;
      objectPost.userID = doctP.data().userId;
      postP.push(objectPost);
      return postP;
    });
    callback(postP);
    console.log(postP);
  };
  leerPostProfile(showPostProfile);

  document.getElementById('goEdit').addEventListener('click', () => {
    window.location.hash = '#/editProfile';
    console.log('hi');
  });
};
