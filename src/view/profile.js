import {
  readPostProfile, getUnsubscribe, leerPostProfile,
} from '../firebase/firestore.js';

import { profileEdit, FunctionEdit } from './editProfile.js';
import {
  showPostProfile,
} from './templatePostProfile.js';

export const Profile = () => {
  // Stop listening to changes
  document.getElementById('container').innerHTML = '';
  const profile = document.createElement('div');
  profile.classList.add('container-profile');
  profile.innerHTML = `
  <!-- <button id="home">Home</button> -->
  <section class="header-profile">
    <div class='container-portada'>
      <img id="frontPageProfile" width="100px"> 
      <button id='goEdit'>Edit Profile</button>
    </div>
    <div class="container-info">
      <img id="photoUserProfile" width="100px">
      <div class="info-profile">
        <div id="infoUserProfile"></div>
        <p id="career"></p>
        <p id="aboutP"></p>
        <ul class="container-follower">
          <li class="follower">
            <p class="li-number">1.2 M</p>
            <p class="li-description">Seguidores</p>
          </li>
          <li class="follow">
            <p class="li-number">98</p>
            <p class="li-description">Seguidos</p>
          </li>
          <li class="posts-li">
            <p class="li-number">250</p>
            <p class="li-description">Posts</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section>
    <h1> MY POST</h1>
    <div id="PostProfile"></div>
  </section>
  <section class="modalEditProfile" style="display:none">
    <div class="modalDiv-editProf">
    <div class="modalContainer-edit">
    </div>
    </div>
  </section>
    `;

  return document.querySelector('#container').appendChild(profile);
};

export const FunctionProfile = () => {
  const idUserRedirect = window.localStorage.getItem('idUserRedirecionar');
  console.log(idUserRedirect);
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  // const userID = userCurrent.uid;
  leerPostProfile(showPostProfile, idUserRedirect);

  readPostProfile(idUserRedirect).then((docUser) => {
    document.getElementById('photoUserProfile').src = `${docUser.data().photo}`;
    document.getElementById('frontPageProfile').src = `${docUser.data().portada}`;
    const info = document.getElementById('infoUserProfile');
    info.innerHTML = `${docUser.data().name}`;
    const career = document.getElementById('career');
    career.innerHTML = `${docUser.data().career}`;
    const aboutParrafo = document.getElementById('aboutP');
    aboutParrafo.innerHTML = `${docUser.data().about}`;
    console.log('Current data: ', docUser.data());
  });

  document.getElementById('goEdit').addEventListener('click', () => {
    profileEdit();
    document.querySelector('.modalEditProfile').style.display = 'flex';
    FunctionEdit();
    document.getElementById('container-footer').style.display = 'none';
  });

  const unsb = getUnsubscribe();
  unsb();
};

// export const showPostProfile = () => {
//   document.getElementById('goEdit').addEventListener('click', () => {
//     profileEdit();
//     document.querySelector('.modalNewPost').style.display = 'flex';
//     FunctionEdit();
//   });
// };
