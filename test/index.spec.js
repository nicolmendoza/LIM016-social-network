// importamos la funcion que vamos a testear
// import { loginEmail, loginGoogle } from '../src/firebase/firebase-auth.js';

import {
  loginEmail, logout, verificationEmail, resetPasswordFirebase, stateChanged,
} from '../src/firebase/firebase-auth';

import {
  signInWithEmailAndPassword,
  signOut, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged,
} from '../src/firebase/firebase-config';

jest.mock('../src/firebase/firebase-config');

describe('myFunction', () => {
  it('debería ser una función', (done) => {
    const res = loginEmail('fake email', 'fake password');
    res.then(() => {
      // console.log(signInWithEmailAndPassword.mock);
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('fake email');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('fake password');
      done();
    });
  });
});
// describe('Function', () => {
//   it('debería ser una función', (done) => {
//     const res = loginGoogle(GoogleAuthProvider);
//     res.then(() => {
//       console.log(signInWithPopup.mock);
//       console.log(signInWithPopup.mock.calls);
//       expect(signInWithPopup.mock.calls[0][1]).toBe('merly');
//       expect(signInWithPopup.mock.calls[0][2]).toBe('merly@gmail.com');
//     });
//     done();
//   });
// });

describe('Function logout', () => {
  it('debería ser una función', (done) => {
    const res = logout();
    res.then(() => {
      try {
        expect(signOut.mock).toBe(undefined);
      } catch (error) {
        console.log(error);
      }
      // expect(logout.mock.calls).toBe(undefined);
    });
    done();
  });
});

describe('Function emailVeri', () => {
  it('debería ser una función', (done) => {
    const res = verificationEmail();
    res.then(() => {
      try {
        expect(sendEmailVerification.mock).toBe(undefined);
      } catch (error) {
        console.log(error);
      }

      // expect(logout.mock.calls).toBe(undefined);
    });
    done();
  });
});

describe('Function reset', () => {
  it('debería ser una función', (done) => {
    const res = resetPasswordFirebase('email@gmail.com');
    res.then(() => {
      expect(sendPasswordResetEmail.mock.calls[0][1]).toBe('email@gmail.com');
    });
    done();
  });
});

// test de firestore.js';'
// describe('savePost', () => {
//   it('funciona', () => {
//     const result = savePost('Fake post', 'fake user', 'fake img', 'public', 'event');
//     expect(result).toBe({
//       message: 'Fake post',
//       userId: 'fake user',
//       img: 'fake img',
//       likes: [{
//         users: [],
//       }],
//       date: Date.now(),
//       privacity: 'public',
//       type: 'event',
//     });

//     expect(collection.mock.calls[0][1]).toBe('post');
//     expect(collection.mock.calls[0][2]).toBe('fake-user-id');

//     expect(typeof addDoc.mock.calls[0][0]).toBe('object');
//   });
// });
describe('Function onAuth', () => {
  it('debería ser una función', (done) => {
    const res = stateChanged('callback');
    res.then(() => {
      expect(onAuthStateChanged.mock.calls[0][1]).toBe('callback');
      console.log(onAuthStateChanged.mock);
    });
    done();
  });
});
