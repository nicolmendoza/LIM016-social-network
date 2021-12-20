import {
  obtenerInfo, deletePost, readLikes, readComment,
} from '../firebase/firestore.js';

export const showPostProfile = (post) => {
  console.log(post);
  const user = JSON.parse(localStorage.getItem('user'));
  const PostProfile = document.getElementById('PostProfile');
  const sectionPostProfile = document.createElement('div');

  post.forEach((onePost) => {
    console.log(onePost);
    sectionPostProfile.innerHTML += `
    <div class="postProfileDiv" id="ID${onePost.postID}">

      <div class="header-post">
        <img class="post-img${user.uid}" width="100px" >
        <div class="header-info">
          <div class="nameUserPostProfile${user.uid}"></div>
          <div class="date"><p></p></div> 
        </div>
      </div>

      <div>${onePost.content}</div>

      <button class="deleteProfile">DELETE</button>
      <button class="edit">EDIT</button>

      <div id="postIcon">
        <i class="far fa-heart icon" id="iconLikes${onePost.postID}"></i> <p id='likes${onePost.postID}'></p>
        <i class="far fa-comment icon"></i><p class="countComment${onePost.postID}"></p>
        <i class="far fa-paper-plane icon"></i>
      </div>
      <div id="comments${onePost.postID}">
        <div id="contentComment${onePost.postID}"></div>
        <div id="showComment${onePost.postID}"></div>
      </div>
    </div>`;
    return sectionPostProfile;
  });
  //   PostProfile.appendChild(sectionPostProfile);

  obtenerInfo(user.uid)
    .then((userInfo) => {
      sectionPostProfile.querySelectorAll(`.nameUserPostProfile${user.uid}`).forEach((nameUser) => {
        // eslint-disable-next-line no-param-reassign
        nameUser.innerHTML = `${userInfo.data().name}`;
      });
      sectionPostProfile.querySelectorAll(`.post-img${user.uid}`).forEach((photoUser) => {
        // eslint-disable-next-line no-param-reassign
        const imgUser = photoUser;
        imgUser.src = `${userInfo.data().photo}`;
      });
    });

  post.forEach((one) => {
    const idPost = one.postID;

    const iconLikes = sectionPostProfile.querySelector(`#iconLikes${idPost}`);
    const parrafoCountLikes = sectionPostProfile.querySelector(`#likes${idPost}`);
    readLikes((likes) => {
      const num = likes.length;
      parrafoCountLikes.innerHTML = num;
      if (num > 0) {
        iconLikes.className = 'fas fa-heart icon';
      }
    }, idPost);

    const parrafoCountComment = sectionPostProfile.querySelector(`.countComment${idPost}`);
    readComment((comments) => {
      const num = comments.length;
      parrafoCountComment.innerHTML = num;
    }, idPost);
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
