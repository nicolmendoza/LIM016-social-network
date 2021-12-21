// importamos la funcion que vamos a testear
// import { loginEmail, loginGoogle } from '../src/firebase/firebase-auth.js';

import {
  loginEmail, loginGoogle,
} from '../src/firebase/firebase-auth';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '../src/firebase/firebase-config';

jest.mock('../src/firebase/firebase-config');

describe('myFunction', () => {
  it('debería ser una función', (done) => {
    const res = loginEmail('fake email', 'fake password');
    res.then(() => {
      console.log(signInWithEmailAndPassword.mock);
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('fake email');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('fake password');
    });
    done();
  });
  it('falla si no recibe argumentos', () => {
  });
});

describe('Function', () => {
  it('debería ser una función', (done) => {
    const res = loginGoogle(GoogleAuthProvider);
    res.then(() => {
      console.log(signInWithPopup.mock);
      console.log(signInWithPopup.mock.calls);
      expect(signInWithPopup.mock.calls[0][1]).toBe('merly');
      expect(signInWithPopup.mock.calls[0][2]).toBe('merly@gmail.com');
    });
    done();
  });
});
