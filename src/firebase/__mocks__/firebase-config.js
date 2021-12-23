// export const loginEmail = jest.fn(() => Promise.resolve({
//   user: {
//     emailVerified: true,
//   },
// }));
// export const loginGoogle = () => Promise.resolve();
// export const loginFacebook = () => Promise.resolve();
// export const loginGitHub = () => Promise.resolve();
// export const currentUser = () => ({
//   currentUser: {
//     uid: '',
//     displayName: '',
//   },
// });
const auth = {
  currentUser: {
    uid: 'fake-user-id',
  },
};

const GoogleAuthProvider = jest.fn(() => Promise.resolve({}));
const FacebookAuthProvider = jest.fn();
const GithubAuthProvider = jest.fn();

const signInWithPopup = jest.fn(() => Promise.resolve({}));

// const userCurrent = auth.currentUser;
// export const setDoc = jest.fn((document, values) => Promise.resolve(values));
// export const doc = jest.fn((db, collection, docId) => Promise.resolve({}));
// export const db = {};

// eslint-disable-next-line max-len
const sendEmailVerification = jest.fn(() => Promise.resolve());
const sendPasswordResetEmail = jest.fn(() => Promise.resolve());
const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));

// MOCK DE FIRESTORE

export const collection = jest.fn((db, values) => Promise.resolve(values));
export const addDoc = jest.fn(() => Promise.resolve({}));
export const db = {};

const signOut = jest.fn(() => Promise.resolve());

export {
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  auth,
  GithubAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
};
