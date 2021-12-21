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

// export const setDoc = jest.fn((document, values) => Promise.resolve(values));
// export const doc = jest.fn((db, collection, docId) => Promise.resolve({}));
// export const db = {};

// eslint-disable-next-line max-len
const signInWithEmailAndPassword = jest.fn((auth, email, password) => Promise.resolve({}));

const sendPasswordResetEmail = jest.fn((email) => Promise.resolve('merly2257@gmail.com'));

// MOCK DE FIRESTORE

export const collection = jest.fn((db, values) => Promise.resolve(values));
export const addDoc = jest.fn((collection, db) => Promise.resolve({}));
export const db = {};

export {
  signInWithEmailAndPassword,
  signInWithPopup,
  auth,
  GithubAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
};
