import { deletePost, updatePost, currentUser } from '../firebase.js';

export const template = (post) => {
  post.forEach((onePost) => {
    document.getElementById('showPost').innerHTML += `<div class="postDiv">
      <div>${onePost.userName}</div>
      <div>${onePost.content}</div>
      <div class="deleteDiv">
      <button id="${onePost.idP}">DELETE</button>
      </div>
      <div class="updateDiv">
      <button id="${onePost.idP}">EDIT</button>
      </div>
      <div>`;
  });

  const user = currentUser().currentUser;
  console.log(user.uid);

  console.log(post);
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
          updatePost(id);
          break;
        // } else {
        //   alert('no puedes borrar un post ajeno');
        //   break;
        }
      }
    });
  });
};
