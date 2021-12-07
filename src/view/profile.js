// eslint-disable-next-line import/no-unresolved
import {
  getAuth,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  doc,
  updateDoc,
  getFirestore,
  onSnapshot,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

export const Profile = () => {
  const divElementProfile = document.createElement('div');
  divElementProfile.innerHTML = `
  <!-- <button id="home">Home</button> -->
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
  const user = auth.currentUser;
  // autentificando usuario logueado

  const db = getFirestore();

  document.getElementById('photoUserProfile').src = user.photoURL;
  (async () => {
    onSnapshot(doc(db, 'usuarios', user.uid), (docUser) => {
      const info = document.getElementById('infoUserProfile');
      info.innerHTML = `Bienvenida ${docUser.data().name}`;
      console.log('Current data: ', docUser.data());
    });
  })();

  // edit username
  console.log(user.uid);

  document
    .getElementById('btn-edit-name')
    .addEventListener('click', async () => {
      const newName = document.getElementById('name');
      const infoUser = doc(db, 'usuarios', user.uid);
      await updateDoc(infoUser, {
        name: newName.value,
      });
    });
  /// ///////

  (async () => {
    onSnapshot(doc(db, 'usuarios', user.uid), (docUser) => {
      const aboutParrafo = document.getElementById('aboutP');
      aboutParrafo.innerHTML = `${docUser.data().about}`;
      console.log('Current data: ', docUser.data());
    });
  })();
  // actualizar about
  document.getElementById('btn-edit-about').addEventListener('click', async () => {
    const About = document.getElementById('about').value;
    const infoUser = doc(db, 'usuarios', user.uid);
    await updateDoc(infoUser, {
      about: About,
    });
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

  // document.getElementById('home').addEventListener('click', () => {
  //   window.location.hash = '#/home';
  // });
};
