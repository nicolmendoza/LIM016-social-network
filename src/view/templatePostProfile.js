import {
  obtenerInfo, deletePost,
} from '../firebase/firestore.js';

export const showPostProfile = (post) => {
  console.log(post);
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

  obtenerInfo(user.uid).then((userInfo) => {
    sectionPostProfile.querySelectorAll(`.nameUserPostProfile${user.uid}`).forEach((nameUser) => {
      // eslint-disable-next-line no-param-reassign
      nameUser.innerHTML = `${userInfo.data().name}`;
    });
  });

  sectionPostProfile.querySelectorAll('.deleteProfile').forEach((div) => {
    div.addEventListener('click', (e) => {
      const idPost = e.target.parentNode.id;
      const cadena = idPost.slice(2);
      console.log(cadena);
      console.log(idPost);
      deletePost(cadena);
    });
  });

  PostProfile.innerHTML = '';
  PostProfile.appendChild(sectionPostProfile);
};
