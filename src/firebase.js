/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js';
import {
  getFirestore,
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
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import {
  getAuth,
  signOut,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  getStorage, ref as sRef, uploadBytesResumable, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD9ngpw2YVZK0ZTgYEn2L3kJX2HFlcDK8Q',
  authDomain: 'social-network-268a8.firebaseapp.com',
  databaseURL: 'https://social-network-268a8-default-rtdb.firebaseio.com',
  projectId: 'social-network-268a8',
  storageBucket: 'social-network-268a8.appspot.com',
  messagingSenderId: '564158720663',
  appId: '1:564158720663:web:0349103b12e24b0fe697d2',
  measurementId: 'G-VP2LPBCJD7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;

export const currentUser = () => auth;

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('log out');
      window.location.hash = '#/';
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

export const deletePost = (id) => deleteDoc(doc(db, 'post', id));

export const updatePost = (id, postEdit) => {
  const washingtonRef = doc(db, 'post', id);
  return updateDoc(washingtonRef, {
    message: postEdit,
  });
};

// export const readPostProfile = (uid) => {
//   const docRef = doc(db, 'usuarios', uid);
//   const docSnap = getDoc(docRef);
//   const docUser = docSnap;
//   return docUser;
// };

export const obtenerInfo = (ID) => {
  const docRef = doc(db, 'usuarios', ID);
  const docSnap = getDoc(docRef);
  return docSnap;
};

export const updateLikePost = (id, cantLikes, idUser) => {
  const postRef = doc(db, 'post', id);
  return updateDoc(postRef, {
    likes: [{
      cant: cantLikes,
      user: idUser,
    }],
  });
};

export const savePost = (postDescription, userID) => {
  const docRef = addDoc(collection(db, 'post'), {
    message: postDescription.value,
    userId: userID,
    likes: [{
      cant: 0,
      user: [],
    }],
    date: Date.now(),
  });
  console.log('Document written with ID: ', docRef);
};

export const saveComment = (id, comentario, uid) => {
  addDoc(collection(db, 'post', id, 'comments'), {
    userID: uid,
    message: comentario,
    date: Date.now(),
  });
};

export const readData = (callback) => {
  const q = query(collection(db, 'post'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const post = [];
    querySnapshot.forEach((doct) => {
      const objectPost = { };
      objectPost.content = doct.data().message;
      objectPost.idP = doct.id;
      objectPost.userID = doct.data().userId;
      objectPost.date = doct.data().date;
      objectPost.likes = doct.data().likes;
      post.push(objectPost);
      return post;
    });
    callback(post);
  });
};

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

export const updateInfoUser = (uid, newAbout, newName) => {
  const infoUser = doc(db, 'usuarios', uid);
  return updateDoc(infoUser, {
    about: newAbout,
    name: newName,
  });
};

export const readComment = (callback, id) => {
  const q = query(collection(db, 'post', id, 'comments'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const comments = [];
    querySnapshot.forEach((docC) => {
      const objectComment = { };
      objectComment.content = docC.data().message;
      objectComment.userID = docC.data().userID;
      objectComment.ID = docC.id;
      comments.push(objectComment);
      return comments;
    });
    callback(comments, id);
  });
};

export const uploadImg = (files, extention, name) => {
  const imgUpload = files;
  const imgName = name + extention;
  const metadata = {
    content: imgUpload.type,
  };
  const storage = getStorage();
  const storageRef = sRef(storage, imgName);
  const UploadTask = uploadBytesResumable(storageRef, imgUpload, metadata);
  UploadTask.on('state-changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  },
  (error) => {
    alert('error al cargar imagen');
  },
  () => {
    getDownloadURL(UploadTask.snapshot.ref).then((downloasURL) => {
      console.log(downloasURL);
    });
  });
};
