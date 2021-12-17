// importamos la funcion que vamos a testear
import { loginEmail, loginGoogle } from '../src/firebase/firebase-auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof loginEmail).toBe('function');
  });
});

describe('Function', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});
