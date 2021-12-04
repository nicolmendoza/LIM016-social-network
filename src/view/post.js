import { deletePost, readData, updatePost } from '../firebase.js';

export const template = (post) => {
  post.forEach((onePost) => {
    document.getElementById('showPost').innerHTML
      += `<div class="postDiv">
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

  document.querySelectorAll('.deleteDiv').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
      deletePost(id);
    });
  });

  document.querySelectorAll('.updateDiv').forEach((div) => {
    div.addEventListener('click', (e) => {
      const id = e.target.id;
      updatePost(id);
    });
  });
};

export const display = () => {
  readData(template);
};
