// importamos la funcion que vamos a testear
// import { loginEmail, loginGoogle } from '../src/firebase/firebase-auth.js';

// import {
//   loginEmail, loginGoogle,
// } from '../src/firebase/firebase-auth';

// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   auth,
//   sendPasswordResetEmail,
// } from '../src/firebase/firebase-config';

// jest.mock('../src/firebase/firebase-config');

// describe('myFunction', () => {
//   it('debería ser una función', (done) => {
//     const res = loginEmail('fake email', 'fake password');
//     res.then(() => {
//       console.log(signInWithEmailAndPassword.mock);
//       expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('fake email');
//       expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('fake password');
//       done();
//     });
//   });
//   it('falla si no recibe argumentos', () => {
//   });
// });

// describe('Function', () => {
//   it('debería ser una función', (done) => {
//     const res = GoogleAuthProvider('merly2257@gmail.com');
//     res.then(() => {
//       expect(signInWithPopup.mock.calls[0][1]).toBe({});
//     });
//     done();
//   });
// });

// describe('deberia ser una función', () => {
//   it('debería ser una función', () => {
//     const res = sendPasswordResetEmail(auth, 'merly2257@gmail.com');
//     res.then(() => {
//       console.log(sendPasswordResetEmail.mock);
//       console.log(sendPasswordResetEmail.mock.calls);
//       expect(sendPasswordResetEmail.mock.calls[0][1]).toBe('merly2257@gmail.com');
//     });
//   });
// });
import { savePost } from '../src/firebase/firestore.js';

import {
  addDoc,
  collection,
} from '../src/firebase/firebase-config';

jest.mock('../src/firebase/firebase-config');

describe('savePost', () => {
  it('funciona', () => {
    const result = savePost('Fake post', 'fake user', 'fake img', 'public', 'event');
    expect(result).toBe({
      message: 'Fake post',
      userId: 'fake user',
      img: 'fake img',
      likes: [{
        users: [],
      }],
      date: Date.now(),
      privacity: 'public',
      type: 'event',
    });

    expect(collection.mock.calls[0][1]).toBe('post');
    expect(collection.mock.calls[0][2]).toBe('fake-user-id');

    expect(typeof addDoc.mock.calls[0][0]).toBe('object');
  });
});
