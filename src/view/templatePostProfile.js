/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
  deletePost, obtenerInfo, updatePost, readComment, saveComment, saveLike, readLikes, deleteLike,
} from '../firebase/firestore.js';
import { templateComents } from './templateComments.js';

export const showPostProfile = (post) => {
  console.log(post);
  const idUserRedirect = window.localStorage.getItem('idUserRedirecionar');
  const user = JSON.parse(localStorage.getItem('user'));
  const PostProfile = document.getElementById('PostProfile');
  const sectionPostProfile = document.createElement('div');

  post.forEach((onePost) => {
    sectionPostProfile.innerHTML += `
    <div class="postDiv" id="${onePost.postID}">
      <div class="div-options">
        <div class="icon-options">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
        <div class='box-options' id="box-options-${onePost.postID}" style="display:none">
          <div class='edit content-icon'>
            <span>
              <i class="fas fa-pencil-alt"></i>Editar
            </span>
          </div>
          <div class='delete content-icon'>
            <span>
              <i class="far fa-trash-alt"></i>Borrar
            </span>
          </div>
        </div>
      </div>
      <div class="header-post">
        <img  id="post-img${onePost.idP}" width="100px" >
        <div class="header-info">
          <div  class="nameUserPostProfile${user.uid} namePost post-name"></div>
          <div class="date"><p></p></div>
        </div>
      </div>
      <div class="text-post-home" id="contentPost${onePost.postID}">${onePost.content}</div>
      <img class="postImg" id="img-${onePost.postID}" src="${onePost.img}">

      <div id="postIcons">
        <div class="likes">
          <i class="far fa-heart icon" id="iconLikes${onePost.postID}"></i>
          <p id='likes${onePost.postID}'></p>
        </div>
        <div class="comments">
          <i class="far fa-comment icon"></i>
          <p class="countComment${onePost.postID}"></p>
        </div>
        <div id="comments${onePost.postID}">
          <div id="contentComment${onePost.postID}"></div>
          <div id="showComment${onePost.postID}"></div>
        </div>
      </div>
    </div>

    <section class="modalDelete" style="display: none">
    <div class="modalDivDelete">
    <div class="modalContainer-Delete">
      <div id="closeDelete">
        <i class="far fa-times-circle"></i>
      </div>
      <div>
        <h1>Eliminar publicación</h1>
        <div class="modal-parrafo">
          ¿Estás seguro que quieres eliminar esta publicación de <b class="emailText">Queen Coders</b> para siembre?
        </div>
        <button class="aceptDelete">ELIMINAR</button>
      </div>
    </div>
    </div>
  </section>`;
    return sectionPostProfile;
  });
  //   PostProfile.appendChild(sectionPostProfile);

  post.forEach((one) => {
    const idPost = one.postID;
    const iconLikes = sectionPostProfile.querySelector(`#iconLikes${idPost}`);
    const parrafoCountLikes = sectionPostProfile.querySelector(`#likes${idPost}`);
    readLikes((likes) => {
      const num = likes.length;
      parrafoCountLikes.innerHTML = num;
      if (likes[0] !== undefined) {
        iconLikes.className = 'fas fa-heart icon';
      }
    }, idPost);

    const parrafoCountComment = sectionPostProfile.querySelector(`.countComment${idPost}`);
    readComment((comments) => {
      const num = comments.length;
      parrafoCountComment.innerHTML = num;
    }, idPost);
  });

  obtenerInfo(idUserRedirect).then((userInfo) => {
    sectionPostProfile.querySelectorAll(`.nameUserPostProfile${user.uid}`).forEach((nameUser) => {
      // eslint-disable-next-line no-param-reassign
      nameUser.innerHTML = `${userInfo.data().name}`;
    });
  });

  sectionPostProfile.querySelectorAll('.date').forEach((date) => {
    const postId = date.parentElement.parentElement.parentElement.id;
    const pElement = date.firstChild;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < post.length; i++) {
      if (post[i].postID === postId) {
        const d = new Date();
        const dateUTC = post[i].date;
        d.setTime(dateUTC);
        const dateData = d.toLocaleDateString();
        pElement.innerHTML = dateData;
      }
    }
  });

  sectionPostProfile.querySelectorAll('.icon-options').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      for (let i = 0; i < post.length; i++) {
        console.log(post);
        if (post[i].userID === user.uid && post[i].postID === id) {
          console.log('Funciona');
          document.querySelector(`#box-options-${id}`).classList.toggle('show');
          console.log(document.querySelector(`#box-options-${id}`).classList);
          break;
        }
      }
    });
  });

  sectionPostProfile.querySelectorAll('.delete').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      document.querySelector('.modalDelete').classList.add('revelar');
      for (let i = 0; i < post.length; i++) {
        document.querySelector('.aceptDelete').addEventListener('click', () => {
          if (post[i].userID === user.uid && post[i].postID === id) {
            deletePost(id);
            document.querySelector('.modalDelete').classList.remove('revelar');
          }
        });
      }
    });
  });

  sectionPostProfile.querySelector('#closeDelete').addEventListener('click', () => {
    document.querySelector('.modalDelete').classList.remove('revelar');
  });

  sectionPostProfile.querySelectorAll('.edit').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      document.querySelector(`#box-options-${id}`).classList.toggle('show');

      for (let i = 0; i < post.length; i++) {
        console.log(post[i].userID === user.uid, post[i].postID === id);
        if (post[i].userID === user.uid && post[i].postID === id) {
          sectionPostProfile.querySelector(`#contentPost${id}`).innerHTML = `<textarea class="editPost" id="contentEdit${post[i].postID}"}>${post[i].content}</textarea>
            <button class="save">SAVE</button>`;
          sectionPostProfile.querySelector('.save').addEventListener('click', () => {
            const postEdit = document.getElementById(`contentEdit${post[i].postID}`).value;
            if (postEdit === `${post[i].content}`) {
              document.querySelector(`#contentPost${post[i].postID}`).innerHTML = `${post[i].content}`;
            } else {
              console.log(document.getElementById(`contentEdit${post[i].postID}`).value);
              updatePost(id, postEdit);
            }

            updatePost(id, postEdit);
          });
          break;
          // } else {
          //   alert('no puedes borrar un post ajeno');
          //   break;
        }
      }
    });
  });

  const uidUser = user.uid;
  const nameUser = user.displayName;
  sectionPostProfile.querySelectorAll('.fa-heart').forEach((like) => {
    like.addEventListener('click', (e) => {
      const postId = e.target.parentNode.parentNode.parentNode.id;
      if (e.target.className === 'far fa-heart icon') {
        e.target.className = 'fas fa-heart icon';
        saveLike(postId, uidUser, nameUser);
        console.log('crea');
        console.log(post);
      } else {
        e.target.className = 'far fa-heart icon';
        deleteLike(postId, uidUser);
        console.log('borra');
      }
    });
  });

  sectionPostProfile.querySelectorAll('.fa-comment').forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const id = e.target.parentNode.parentNode.parentNode.id;
      const showComment = document.getElementById(`showComment${id}`);
      showComment.innerHTML = '';
      readComment(templateComents, id);

      const divComment = document.createElement('div');
      divComment.innerHTML = `<textarea id="textComent${id}"></textarea>
        <button id="saveComment${id}">SAVE</button>`;
      sectionPostProfile.querySelector(`#contentComment${id}`).appendChild(divComment);
      document.getElementById(`saveComment${id}`).addEventListener('click', () => {
        const commentOne = document.getElementById(`textComent${id}`).value;
        saveComment(id, commentOne, uidUser);
        document.getElementById(`textComent${id}`).value = '';
      });
    });
  });

  PostProfile.innerHTML = '';
  PostProfile.appendChild(sectionPostProfile);
};
