// import {
//   getFirestore, collection, addDoc,
// // eslint-disable-next-line import/no-unresolved
// } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  deletePost, currentUser, obtenerInfo, updatePost, readComment, saveComment, updateLikePost,
} from '../firebase.js';

import { templateComents }
  from './comments.js';

export const template = (post) => {
  console.log(post);
  const showPost = document.getElementById('showPost');
  const nuevoElemento = document.createElement('div');
  const postElements = post.map(async (onePost) => {
    const dataUser = await obtenerInfo(onePost.userID);
    nuevoElemento.innerHTML += `<div class="postDiv" id="${onePost.idP}">
      <div>${dataUser.data().name}</div>
      <div class="date"><p></p></div>
      <div id="contentPost${onePost.idP}">${onePost.content}</div>
      <button class="delete">DELETE</button>
      <button class="edit">EDIT</button>
      <div id="postIcon">
          <i class="far fa-heart icon iconHeart" id="${onePost.idP}"></i>
          <i class="far fa-comment icon"></i>
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
    const user = currentUser().currentUser;
    const uidUser = (user.uid);

    nuevoElemento.querySelectorAll('.date').forEach((date) => {
      const postId = date.parentElement.id;
      const pElement = date.firstChild;

      // eslint-disable-next-line no-plusplus
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

        // eslint-disable-next-line no-plusplus
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

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < post.length; i++) {
          console.log(post[i].userID === user.uid, post[i].idP === id);
          if (post[i].userID === user.uid && post[i].idP === id) {
            document.querySelector(`#contentPost${post[i].idP}`).innerHTML = `<textarea id="contentEdit">${post[i].content}</textarea>
            <button class="save">SAVE</button>`;
            document.querySelector('.save').addEventListener('click', () => {
              const postEdit = document.getElementById('contentEdit').value;
              console.log(document.getElementById('contentEdit').value);
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
    nuevoElemento.querySelectorAll('.iconHeart').forEach((like) => {
      let clickCounter = 0;

      like.addEventListener('click', (e) => {
        clickCounter += 1;

        let cant = 0;
        const userCurrentId = currentUser().currentUser.uid;
        const postId = e.target.parentNode.parentNode.id;

        const currentPost = post.filter((postElement) => postElement.idP === postId);
        const people = currentPost[0].likes[0].user;
        // console.log(people);

        function removeItemFromArr(arr, item) {
          const i = arr.indexOf(item);
          if (i !== -1) {
            arr.splice(i, 1);
          }
        }

        if (clickCounter === 1) {
          e.target.classList.add('fas');
          people.push(userCurrentId);
          cant = people.length;
          console.log(`clickCounter ${clickCounter}`);
          console.log(`people ${people}`);
          console.log(`cant ${cant}`);
          console.log(postId, cant, people);
          console.log('------------------------------------');
          updateLikePost(postId, cant, people);
        } else {
          e.target.classList.remove('fas');
          removeItemFromArr(people, userCurrentId);
          cant = people.length;
          clickCounter = 0;
          console.log(`clickCounter ${clickCounter}`);
          console.log(`people ${people}`);
          console.log(`cant ${cant}`);
          console.log(postId, cant, people);
          console.log('------------------------------------');
          updateLikePost(postId, cant, people);
        }
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
          console.log(commentOne);
          saveComment(id, commentOne, uidUser);
        });
      });
    });

    showPost.innerHTML = '';
    showPost.appendChild(nuevoElemento);
  });
};
