import { loginEmail } from '../src/firebase/__mocks__/firebase-config.js';

import { handleSubmit } from '../src/view/login-signUp/login.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

jest.mock('../src/firebase/firebase-config');

describe('SignIn', () => {
//   it('Al hacer click se llama func sign in', () => {
//     const dom = new JSDOM(`<! DOCTYPE html>
//     <form  id="login-form"></form>`);
  it('handleSubmit', () => {
    handleSubmit({
      preventDefault: () => {},
      target: {
        querySelector: (sel) => {
          if (sel === '#login-email') {
            return 'correo@email.com';
          } if (sel === '#login-password') {
            return 'password';
          }
          loginEmail('email', 'password').then((userCredential) => {
            console.log(userCredential);
            const user = userCredential.user;
            if (user.emailVerified === true) {
              console.log(userCre);
            } else {
              alert('Te hemos enviado un email para verificar tu cuenta. Por favor revisa tu bandeja.');
            }
            expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('email');
            expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('password');
          });
        },
      },
    });
  });
  // dom.window.document.querySelector('#login-form').addEventListener('submit',
  //   loginEmail('email', 'password').then((userCredential) => {
  //     expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('email');
  //     expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('password');
  //   })); // "Hola Mundo"
});
// });
