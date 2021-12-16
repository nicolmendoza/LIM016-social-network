/* eslint-disable import/no-unresolved */
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  where,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { db } from './firebase-config.js';

// /* -------------- DATOS DE USUARIO -------------- */
export const userDocRef = (nameDoc, currentUserId) => doc(db, nameDoc, currentUserId);
export const getUserDoc = (docRef) => getDoc(docRef);
export const setUserDoc = (docs, obj) => setDoc(docs, obj);
export const updateUserDoc = (docRef, obj) => updateDoc(docRef, obj);

// /* ------------------  POSTS  --------------------- */
let unsubscribe;

export const readData = (callback) => {
  const q = query(collection(db, 'post'), orderBy('date', 'desc'));
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doct) => {
      const objectPost = { };
      objectPost.content = doct.data().message;
      objectPost.idP = doct.id;
      objectPost.userID = doct.data().userId;
      objectPost.date = doct.data().date;
      objectPost.likes = doct.data().likes;
      objectPost.img = doct.data().img;
      posts.push(objectPost);
    });
    callback(posts);
    // console.log(posts);
  });
};

export const getUnsubscribe = () => unsubscribe;

export const obtenerInfo = (ID) => {
  const docRef = doc(db, 'usuarios', ID);
  const docSnap = getDoc(docRef);
  return docSnap;
};
export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

export const updatePost = (id, postEdit) => {
  const washingtonRef = doc(db, 'post', id);
  return updateDoc(washingtonRef, {
    message: postEdit,
  });
};

export const updateLikePost = (id, people) => {
  const postRef = doc(db, 'post', id);
  return updateDoc(postRef, {
    likes: [{
      users: people,
    }],
  });
};

export const savePost = (postDescription, userID, imgULR) => {
  const docRef = addDoc(collection(db, 'post'), {
    message: postDescription.value,
    userId: userID,
    img: imgULR,
    likes: [{
      users: [],
    }],
    date: Date.now(),
  });
};

// /* ----------------- COMENTARIOS ----------------- */
export const saveComment = (id, comentario, uid) => {
  addDoc(collection(db, 'post', id, 'comments'), {
    userID: uid,
    message: comentario,
    date: Date.now(),
  });
};

export const readComment = (callback, id) => {
  const q = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
  return new Promise((resolve, reject) => {
    onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((docC) => {
        const objectComment = { };
        objectComment.content = docC.data().message;
        objectComment.userID = docC.data().userID;
        objectComment.ID = docC.id;
        comments.push(objectComment);
      });
      resolve(callback(comments, id));
    });
  });
};

// export const countComment = (id) => {
//   const qC = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
//   return new Promise((resolve, reject) => {
//     onSnapshot(qC, (querySnapshot) => {
//       const commentsOne = [];
//       querySnapshot.forEach((docC) => {
//         commentsOne.push(docC.data());
//       });

//       resolve(commentsOne.length);
//     });
//   });
// };

export const updateComment = (id, idComment, newComment) => {
  const washingtonRef = doc(db, 'post', id, 'comments', idComment);
  return updateDoc(washingtonRef, {
    message: newComment,
  });
};

export const deleteComment = (id, idComment) => {
  deleteDoc(doc(db, 'post', id, 'comments', idComment));
};

// /* -------------------- PERFIL -------------------- */
export const leerPostProfile = (callback, uid) => {
  getDocs(query(collection(db, 'post'), where('userId', '==', `${uid}`))).then((resultado) => {
    const postP = [];
    resultado.forEach((doctP) => {
      const objectPostProfile = { };
      objectPostProfile.content = doctP.data().message;
      objectPostProfile.userID = doctP.data().userId;
      postP.push(objectPostProfile);
      return postP;
    });
    callback(postP);
    console.log(postP);
  });
};

export const readPostProfile = (uid) => {
  const docRef = doc(db, 'usuarios', uid);
  const docSnap = getDoc(docRef);
  const docUser = docSnap;
  return docUser;
};

export const updateInfoUser = (uid, newAbout, newName, newPhoto, URLportada, newCareer) => {
  const infoUser = doc(db, 'usuarios', uid);
  return updateDoc(infoUser, {
    about: newAbout,
    name: newName,
    photo: newPhoto,
    portada: URLportada,
    career: newCareer,
  });
};
