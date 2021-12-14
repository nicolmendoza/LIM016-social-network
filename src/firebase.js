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
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

// import {
//   getStorage, ref as sRef, uploadBytesResumable, getDownloadURL,
// } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js';

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
const storage = getStorage();

export const currentUser = () => auth;
/* ----------------------------VISTA CON INICIO DE SESION - AUTH ---------------------------------*/

/** ********RESET PASSWORD***** */
export const resetPasswordFirebase = (email) => sendPasswordResetEmail(auth, email);

/** ********SIGN OUT***** */
export const logout = () => signOut(auth);

/** ********VERIFICAR EMAIL***** */
export const emailVerify = () => sendEmailVerification(auth.currentUser);

/** ********CAMBIO DE SESION***** */
export const stateChanged = (callback) => onAuthStateChanged(auth, callback);

/* ----------------FUNCIONES RELACIONADAS A FIRESTORE ------------------- */

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

export const updateLikePost = async (id, people) => {
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
  console.log('Document written with ID: ', docRef);
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
      objectPost.img = doct.data().img;
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

export const saveComment = (id, comentario, uid) => {
  addDoc(collection(db, 'post', id, 'comments'), {
    userID: uid,
    message: comentario,
    date: Date.now(),
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

/* ---------------------------FUNCIONES RELACIONADAS A STORAGE----------------------------------*/

// Create the file metadata
/* @type {any} */

// export const uploadImg = function (files) {
//   const imgUpload = files[0];
//   const metadata = { content: imgUpload.type };

//   const storageRef = ref(storage, `img-post/${imgUpload.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, imgUpload, metadata);
//   // Listen for state changes, errors, and completion of the upload.
//   uploadTask.on('state_changed', (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log(`Upload is ${progress}% done`);
//     // switch (snapshot.state) {
//     //   case 'paused':
//     //     console.log('Upload is paused');
//     //     break;
//     //   case 'running':
//     //     console.log('Upload is running');
//     //     break;
//     // }
//   },
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     // switch (error.code) {
//     //   case 'storage/unauthorized':
//     //     // User doesn't have permission to access the object
//     //     break;
//     //   case 'storage/canceled':
//     //     // User canceled the upload
//     //     break;

//     //   case 'storage/unknown':
//     //     // Unknown error occurred, inspect error.serverResponse
//     //     break;
//     // }
//   },
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   });
// };

export const storageRef = (imgUpload) => ref(storage, `img-post/${imgUpload.name}`);

// eslint-disable-next-line max-len
export const uploadTask = (storageRef1, imgUpload, metadata) => uploadBytesResumable(storageRef1, imgUpload, metadata);
// export const uploadTask = function (imgUpload, metadata) {
//   const task = uploadBytesResumable(storageRef, imgUpload, metadata);
//   task.on('state_changed', (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log(`Upload is ${progress}% done`);
//   });
// };
export const getPhotoURL = (task) => getDownloadURL(task);

/* .............SIGNUP.............. */
const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const verificationEmail = () => sendEmailVerification(auth.currentUser);

/* ........LOGIN PROVEEDORES....... */
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();

/* ..........LOGIN............ */
const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
const loginGoogle = () => signInWithPopup(auth, providerGoogle);
const loginFacebook = () => signInWithPopup(auth, providerFacebook);
const loginGitHub = () => signInWithPopup(auth, providerGithub);

export {
  createUser,
  verificationEmail,
  loginEmail,
  loginGoogle,
  loginFacebook,
  loginGitHub,
};

/* ....ALMACENAR DATOS DE USUARIO.... */
const userDocRef = (nameDoc, currentUserId) => doc(db, nameDoc, currentUserId);
const getUserDoc = (docRef) => getDoc(docRef);
const setUserDoc = (docs, obj) => setDoc(docs, obj);
const updateUserDoc = (docRef, obj) => updateDoc(docRef, obj);

export {
  userDocRef,
  getUserDoc,
  setUserDoc,
  updateUserDoc,
};
