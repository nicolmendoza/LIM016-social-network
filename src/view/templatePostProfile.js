/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  obtenerInfo, deletePost,
} from '../firebase/firestore.js';

export const showPostProfile = (post) => {
  console.log(post);
  const idUserRedirect = window.localStorage.getItem('idUserRedirecionar');
  const user = JSON.parse(localStorage.getItem('user'));
  const PostProfile = document.getElementById('PostProfile');
  const sectionPostProfile = document.createElement('div');

  post.forEach((onePost) => {
    sectionPostProfile.innerHTML += `<div class="postDiv" id="ID${onePost.postID}">
      <div  class="nameUserPostProfile${user.uid}"></div>
      <div>${onePost.content}</div>
      <button class="deleteProfile">DELETE</button>
      <button class="edit">EDIT</button>
      <div>`;
    return sectionPostProfile;
  });
  //   PostProfile.appendChild(sectionPostProfile);

  obtenerInfo(idUserRedirect).then((userInfo) => {
    sectionPostProfile.querySelectorAll(`.nameUserPostProfile${user.uid}`).forEach((nameUser) => {
      // eslint-disable-next-line no-param-reassign
      nameUser.innerHTML = `${userInfo.data().name}`;
    });
  });
  // post.forEach(async (one) => {
  //   const idPost = one.idP;
  //   const idUser = one.userID;
  //   const parrafoNameProfile = sectionPostProfile.querySelector(`.nameUserPostProfile${idUser}`);
  //   // const divPhotoUser = sectionPostProfile.querySelector(`#post-img${idPost}`);
  //   const dataUser = await obtenerInfo(idUser);
  //   parrafoNameProfile.innerHTML = dataUser.data().name;
  //   // divPhotoUser.src = dataUser.data().photo;
  //   // divPhotoUser= dataUser.data().photo;
  // });

  sectionPostProfile.querySelectorAll('.deleteProfile').forEach((div) => {
    div.addEventListener('click', (e) => {
      const idPost = e.target.parentNode.id;
      const id = idPost.slice(2);
      console.log(id);
      console.log(idPost);
      for (let i = 0; i < post.length; i++) {
        document.querySelector('.deleteProfile').addEventListener('click', () => {
          console.log(post[i].userID === user.uid, post[i].idP === id);
          if (post[i].userID === user.uid && post[i].idP === id) {
            deletePost(id);
            // document.querySelector('.modalDelete').classList.remove('revelar');
          }
        });
      }
    });
  });

  PostProfile.innerHTML = '';
  PostProfile.appendChild(sectionPostProfile);
};
