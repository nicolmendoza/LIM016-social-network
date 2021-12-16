import {
  obtenerInfo, currentUser, updateComment, deleteComment,
} from '../firebase/firebase.js';

export const templateComents = (comments, id) => {
  console.log(comments);
  const showComment = document.getElementById(`showComment${id}`);
  const divComment = document.createElement('div');
  const commentsElements = comments.map(async (oneComment) => {
    const dataUser = await obtenerInfo(oneComment.userID);
    divComment.innerHTML += `
    <div id="${oneComment.ID}" class="divComment">
    <div>${dataUser.data().name}</div>
    <div id="contentEdit-${oneComment.ID}">${oneComment.content}</div>
    <button class="deleteComment">Delete</button>
    <button class="editComment">Edit</button>
    </div>`;
    return divComment;
  });
  Promise.all(commentsElements).then(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    divComment.querySelectorAll('.deleteComment').forEach((div) => div.addEventListener('click', (e) => {
      const idComment = e.target.parentNode.id;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < comments.length; i++) {
        console.log(comments[i].ID === idComment && comments[i].userID === user.uid);
        if (comments[i].ID === idComment && comments[i].userID === user.uid) {
          deleteComment(id, idComment);
        }
        console.log(idComment);
      }
    }));
    divComment.querySelectorAll('.editComment').forEach((div) => div.addEventListener('click', (e) => {
      const idComment = e.target.parentNode.id;
      console.log(idComment);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < comments.length; i++) {
        console.log(comments[i].ID === idComment && comments[i].userID === user.uid);
        if (comments[i].ID === idComment && comments[i].userID === user.uid) {
          document.querySelector(`#contentEdit-${idComment}`).innerHTML = `<textarea id="edit-${idComment}">${comments[i].content}</textarea>
            <button id="save-${idComment}">SAVE</button>`;
          document.querySelector(`#save-${idComment}`).addEventListener('click', () => {
            const commentEdit = document.getElementById(`edit-${idComment}`);
            console.log(commentEdit.value);
            updateComment(id, idComment, commentEdit.value);
          });
        }
      }
    }));
    showComment.innerHTML = '';
    showComment.appendChild(divComment);
  });
};
