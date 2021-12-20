/**
 * @jest-environment jsdom
 */
// importamos la funcion que vamos a testear
import MockFirebase from 'mock-cloud-firestore';
import { loginEmail, loginGoogle } from '../src/firebase/firebase-auth.js';
// firebase es una variable global

jest.mock('../src/firebase/firebase-auth.js', () => ({
  loginEmail: jest.fn(() => Promise.resolve({
    user: {
      emailVerified: true,
    },

  })),
  loginGoogle: jest.fn(() => Promise.resolve()),
}));

const fixtureData = {
  __collection__: {
    user: {
      __doc__: {
        user_a: {
          about: 'about',
          name: 'user_a',
        },
      },
    },
  },
};

window.firebase = new MockFirebase(fixtureData);
describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof loginEmail).toBe('function');
  });
  it('Debería estar verificado', () => loginEmail('nicol@gmail.com', '123456')
    .then((userCredential) => {
      const user = userCredential.user;
      expect(user.emailVerified).toBe(true);
    }));
});

describe('Function', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});
