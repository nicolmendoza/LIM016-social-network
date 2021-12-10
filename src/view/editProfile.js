// eslint-disable-next-line import/no-unresolved
// import {
//   getAuth,
//   // eslint-disable-next-line import/no-unresolved
// } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import { obtenerInfo, currentUser, updateInfoUser } from '../firebase.js';

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

  (() => {
    obtenerInfo(user.uid).then((userInfo) => {
      console.log(userInfo);
      document.getElementById('photoUserEdit').src = `${userInfo.data().photo}`;
      document.getElementById('edit-name').value = `${userInfo.data().name}`;
      document.getElementById('edit-about').value = `${userInfo.data().about}`;
    });
  })();

  //   // autentificando usuario logueado

  document
    .getElementById('btn-edit')
    .addEventListener('click', () => {
      updateInfoUser(user.uid, document.getElementById('edit-about').value, document.getElementById('edit-name').value);
      window.location.hash = '#/profile';
    });
};
