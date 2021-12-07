/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  getDoc,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import {
  getAuth,
  signOut,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

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

export const saveAbout = async (About) => {
  await setDoc(doc(db, 'usuarios', (auth.currentUser).uid), {
    about: About,
  });
};

export const showAbout = async (idUser) => {
  const Snapshot = await getDocs(collection(db, 'usuarios'));
  Snapshot.forEach((docAbout) => {
    if (docAbout.id === idUser) {
      document.getElementById('aboutP').innerHTML = `About : ${
        docAbout.data().about
      }`;
      console.log(docAbout.id, ' => ', docAbout.data());
    }
  });
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, 'post', id));
};

export const updatePost = async (id, postEdit) => {
  // const postDescription = document.getElementById('post-description').value;
  const washingtonRef = doc(db, 'post', id);
  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    message: postEdit,
  });
};

export const obtenerInfo = async (ID) => {
  const docRef = doc(db, 'usuarios', ID);
  const docSnap = await getDoc(docRef);

  return docSnap.data().name;
};

export const updateLikePost = async (id, likeCount) => {
  const postLiked = doc(db, 'post', id);
  await updateDoc(postLiked, {
    likes: likeCount,
  });
};

export const savePost = async (postDescription, userID) => {
  console.log(await obtenerInfo(userID));
  const docRef = await addDoc(collection(db, 'post'), {
    message: postDescription.value,
    userName: await obtenerInfo(userID),
    userId: userID,
    likes: 0,
    date: Date.now(),
  });
  // console.log('Document written with ID: ', docRef.id);
};

export const readData = async (callback) => {
  const q = query(collection(db, 'post'), orderBy('date', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const post = [];
    querySnapshot.forEach((doct) => {
      const objectPost = { };
      objectPost.content = doct.data().message;
      objectPost.userName = doct.data().userName;
      objectPost.idP = doct.id;
      objectPost.userID = doct.data().userId;
      objectPost.likes = doct.data().likes;
      post.push(objectPost);
    });
    callback(post);
  });
};
