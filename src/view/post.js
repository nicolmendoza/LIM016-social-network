/* eslint-disable no-plusplus */
// import {
//   getFirestore, collection, addDoc,
// } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  deletePost,
  currentUser, obtenerInfo, updatePost, readComment, saveComment, updateLikePost,
} from '../firebase.js';

import { templateComents }
  from './comments.js';

export const template = (post) => {
  console.log(post);
  const showPost = document.getElementById('showPost');
  const nuevoElemento = document.createElement('div');
  const user = currentUser().currentUser;

  const postElements = post.map(async (onePost) => {
    const dataUser = await obtenerInfo(onePost.userID);

    const arrOfUsers = onePost.likes[0].users;
    const likeIcon = arrOfUsers.includes(user.uid) ? 'fas' : '';

    nuevoElemento.innerHTML += `
    <div class="postDiv" id="${onePost.idP}">
      <div class="header-post">
        <img src=${dataUser.data().photo} width="100px" >
        <div class="header-info">
          <div class="post-name">${dataUser.data().name}</div>
          <div class="date"><p></p></div> 
        </div>
      </div>
      <div class="text-post-home" id="contentPost${onePost.idP}">${onePost.content}</div>
      <img class="postImg" id="img-${onePost.idP}" src="${onePost.img}">
      <button class="delete">DELETE</button>
      <button class="edit">EDIT</button>
      <div id="postIcon">
          <i class="${likeIcon} far fa-heart icon"></i> <p class='cant'>${onePost.likes[0].users.length}</p>
          <i class="far fa-comment icon"></i><p class="countComment${onePost.idP}"></p>
          <i class="far fa-paper-plane icon"></i>
      </div>
      <div id="comments${onePost.idP}">
        <div id="contentComment${onePost.idP}"></div>
        <div id="showComment${onePost.idP}"></div>
      </div>
    </div>`;

    return nuevoElemento;
  });

  Promise.all(postElements).then(() => {
    const uidUser = (user.uid);

    post.forEach((one) => {
      const idPost = one.idP;
      const parrafoCountComment = nuevoElemento.querySelector(`.countComment${idPost}`);
      readComment((comments) => {
        const num = comments.length;
        parrafoCountComment.innerHTML = num;
      }, idPost);
    });

    nuevoElemento.querySelectorAll('.postImg').forEach((postImg) => {
      const imgSrc = postImg;
      for (let i = 0; i < post.length; i++) {
        if (imgSrc.src !== 'http://127.0.0.1:5500/src/index.html') {
          imgSrc.className = 'img-post-home';
        } else {
          imgSrc.className = 'postImg';
        }
      }
    });

    nuevoElemento.querySelectorAll('.date').forEach((date) => {
      const postId = date.parentElement.parentElement.parentElement.id;
      const pElement = date.firstChild;
      for (let i = 0; i < post.length; i++) {
        if (post[i].idP === postId) {
          const d = new Date();
          const dateUTC = post[i].date;
          d.setTime(dateUTC);
          const dateData = d.toLocaleDateString();
          // console.log(dateData, i);

          pElement.innerHTML = dateData;
        }
      }
    });

    nuevoElemento.querySelectorAll('.delete').forEach((div) => {
      div.addEventListener('click', (e) => {
        console.log('hi');
        console.log(e.target.parentNode);
        const id = e.target.parentNode.id;
        console.log(id);

        for (let i = 0; i < post.length; i++) {
          console.log(post[i].userID === user.uid, post[i].idP === id);
          if (post[i].userID === user.uid && post[i].idP === id) {
            deletePost(id);
            break;
          // } else {
          //   alert('no puedes borrar un post ajeno');
          //   break;
          }
          // }
        }
      });
    });

    nuevoElemento.querySelectorAll('.edit').forEach((div) => {
      div.addEventListener('click', (e) => {
        const id = e.target.parentNode.id;
        console.log(id);

        for (let i = 0; i < post.length; i++) {
          console.log(post[i].userID === user.uid, post[i].idP === id);
          if (post[i].userID === user.uid && post[i].idP === id) {
            document.querySelector(`#contentPost${post[i].idP}`).innerHTML = `<textarea id="contentEdit${post[i].idP}"}>${post[i].content}</textarea>
            <button class="save">SAVE</button>`;
            document.querySelector('.save').addEventListener('click', () => {
              const postEdit = document.getElementById(`contentEdit${post[i].idP}`).value;
              if (postEdit === `${post[i].content}`) {
                document.querySelector(`#contentPost${post[i].idP}`).innerHTML = `${post[i].content}`;
              } else {
                console.log(document.getElementById(`contentEdit${post[i].idP}`).value);
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

    nuevoElemento.querySelectorAll('.fa-heart').forEach((like) => {
      like.addEventListener('click', (e) => {
        const postId = e.target.parentNode.parentNode.id;
        const currentPost = post.filter((postElement) => postElement.idP === postId);
        const arrOfUsers = currentPost[0].likes[0].users;
        const cant = e.target.nextElementSibling;

        function removeItemFromArr(arr, item) {
          const j = arr.indexOf(item);
          if (j !== -1) {
            arr.splice(j, 1);
          }
        }

        if (arrOfUsers.includes(user.uid)) {
          e.target.classList.toggle('fas');
          removeItemFromArr(arrOfUsers, user.uid);
          console.log('remove fas');
          console.log(`people ${arrOfUsers}`);
          console.log(postId, arrOfUsers);
          console.log('------------------------------------');
          updateLikePost(postId, arrOfUsers);
        } else {
          e.target.classList.toggle('fas');
          arrOfUsers.push(user.uid);
          console.log('add fas');
          console.log(`people ${arrOfUsers}`);
          console.log(postId, arrOfUsers);
          console.log('------------------------------------');
          updateLikePost(postId, arrOfUsers);
        }
        cant.innerHTML = arrOfUsers.length;
      });
    });

    nuevoElemento.querySelectorAll('.fa-comment').forEach((icon) => {
      icon.addEventListener('click', (e) => {
        const id = e.target.parentNode.parentNode.id;
        const showComment = document.getElementById(`showComment${id}`);
        showComment.innerHTML = '';
        readComment(templateComents, id);

        const divComment = document.createElement('div');
        divComment.innerHTML = `<textarea id="textComent${id}"></textarea>
        <button id="saveComment${id}">SAVE</button>`;
        nuevoElemento.querySelector(`#contentComment${id}`).appendChild(divComment);
        document.getElementById(`saveComment${id}`).addEventListener('click', () => {
          const commentOne = document.getElementById(`textComent${id}`).value;
          // if (commentOne !== '') {
          //   console.log(commentOne);
          //   saveComment(id, commentOne, uidUser);
          // } else {
          //   divComment.remove(`<textarea id="textComent${id}"></textarea>
          //   <button id="saveComment${id}">SAVE</button>`);
          // }
          saveComment(id, commentOne, uidUser);
          document.getElementById(`textComent${id}`).value = '';
        });
      });
    });
    showPost.innerHTML = '';
    showPost.appendChild(nuevoElemento);
  });
};