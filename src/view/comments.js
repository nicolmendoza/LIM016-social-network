// eslint-disable-next-line import/no-unresolved
import {
  doc, deleteDoc, getFirestore,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import {
  obtenerInfo, currentUser, updateComment,
} from '../firebase.js';
export const templateComents = (comments, id) => {
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
    const user = currentUser().currentUser;
    console.log(user);
    const db = getFirestore();
    divComment.querySelectorAll('.deleteComment').forEach((div) => div.addEventListener('click', (e) => {
      const idComment = e.target.parentNode.id;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < comments.length; i++) {
        console.log(comments[i].ID === idComment && comments[i].userID === user.uid);
        if (comments[i].ID === idComment && comments[i].userID === user.uid) {
          deleteDoc(doc(db, 'post', id, 'comments', idComment));
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
