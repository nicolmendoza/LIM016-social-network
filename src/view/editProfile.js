// eslint-disable-next-line import/no-unresolved
// import {
//   getAuth,
//   // eslint-disable-next-line import/no-unresolved
// } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  doc,
  updateDoc,
  getFirestore,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import { obtenerInfo, currentUser } from '../firebase.js';

export const profileEdit = () => {
  const EditProfile = document.createElement('div');
  EditProfile.innerHTML = `
    <div>Edit Profile</div>
    <img id="photoUserEdit" width="100px">
    <p>Edita tu Nombre</p>
    <input type="text" id="edit-name"  placeholder="Name" >
    <p>Edita tu about</p>
    <input type="text" id="edit-about"  placeholder="About" >
    <button id="btn-edit">Save</button>`;
  document.getElementById('container').innerHTML = '';
  return document.getElementById('container').appendChild(EditProfile);
};

export const FunctionEdit = () => {
  const user = currentUser().currentUser;

  (async () => {
    const userInfo = await obtenerInfo(user.uid);
    console.log(userInfo);
    document.getElementById('photoUserEdit').src = `${userInfo.photo}`;
    document.getElementById('edit-name').value = `${userInfo.name}`;
    document.getElementById('edit-about').value = `${userInfo.about}`;
  })();

  //   // autentificando usuario logueado

  const db = getFirestore();

  document
    .getElementById('btn-edit')
    .addEventListener('click', async () => {
      const infoUser = doc(db, 'usuarios', user.uid);
      await updateDoc(infoUser, {
        about: document.getElementById('edit-about').value,
        name: document.getElementById('edit-name').value,
      });
      window.location.hash = '#/profile';
    });
};
