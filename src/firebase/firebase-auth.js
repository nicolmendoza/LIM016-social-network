import {
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

import { auth } from './firebase.js';

export const currentUser = () => auth;

/* ........LOGIN PROVEEDORES....... */
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerGithub = new GithubAuthProvider();

/* ---------------VISTA CON INICIO DE SESION - AUTH -----------------*/

/* ******* SIGNUP ******* */
// eslint-disable-next-line max-len
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const verificationEmail = () => sendEmailVerification(auth.currentUser);

/* ******* LOGIN ******* */
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const loginGoogle = () => signInWithPopup(auth, providerGoogle);
export const loginFacebook = () => signInWithPopup(auth, providerFacebook);
export const loginGitHub = () => signInWithPopup(auth, providerGithub);

/** ***** RESET PASSWORD ***** */
export const resetPasswordFirebase = (email) => sendPasswordResetEmail(auth, email);

/** ***** SIGN OUT ***** */
export const logout = () => signOut(auth);

/** ***** VERIFICAR EMAIL ***** */
export const emailVerify = () => sendEmailVerification(auth.currentUser);

/** ***** CAMBIO DE SESION ***** */
export const stateChanged = (callback) => onAuthStateChanged(auth, callback);
