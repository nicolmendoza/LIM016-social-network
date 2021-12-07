/* eslint-disable no-plusplus */
import {
  deletePost, updatePost, updateLikePost, currentUser, savePost,
} from '../firebase.js';

export const template = (post) => {
  post.forEach((onePost) => {
    document.getElementById('showPost').innerHTML += `
      <div class="postDiv">
        <div>${onePost.userName}</div>
        <div id="contentPost${onePost.idP}">${onePost.content}</div>
        <div class="deleteDiv">
          <button id="${onePost.idP}">DELETE</button>
        </div>
        <div class="updateDiv">
          <button id="${onePost.idP}">EDIT</button>
        </div>
        <div id="postIcon">
          <i class="far fa-heart icon iconHeart" id="${onePost.idP}"></i>
          <i class="far fa-comment icon"></i>
          <i class="far fa-paper-plane icon"></i>
        </div>
      </div>`;
  });

  const user = currentUser().currentUser;
  // console.log(user.uid);

  // console.log(post);
  document.querySelectorAll('.deleteDiv').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
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
      }
    });
  });

  document.querySelectorAll('.updateDiv').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < post.length; i++) {
        console.log(post[i].userID === user.uid, post[i].idP === id);
        if (post[i].userID === user.uid && post[i].idP === id) {
          document.querySelector(`#contentPost${post[i].idP}`).innerHTML = `<textarea id="contentEdit">${post[i].content}</textarea>
          <button class="save">SAVE</button>`;
          document.querySelector('.save').addEventListener('click', () => {
            e.preventDefault();
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

  document.querySelectorAll('.iconHeart').forEach((like) => {
    let clickCounter = 0;
    let likeCounter = 0;

    like.addEventListener('click', (e) => {
      clickCounter += 1;
      console.log(clickCounter);
      const likeId = e.target.id;
      console.log(likeId);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < post.length; i++) {
        if (clickCounter === 1 && post[i].idP === likeId) {
          e.target.classList.add('fas');
          likeCounter = post[i].likes + 1;
          console.log(post[i]);
          console.log(`clickCounter ${clickCounter}`);
          console.log(`likeCounter ${likeCounter}`);
          // updateLikePost(likeId, likeCounter);
          break;
        }
        if (clickCounter === 2 && post[i].idP === likeId) {
          e.target.classList.remove('fas');
          likeCounter = post[i].likes - 1;
          console.log(post[i]);
          console.log(`clickCounter ${clickCounter}`);
          console.log(`likeCounter ${likeCounter}`);
          // updateLikePost(likeId, likeCounter);
          clickCounter = 0;
          break;
        }
      }
    });
  });
};
