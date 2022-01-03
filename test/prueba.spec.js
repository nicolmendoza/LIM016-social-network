/**
 * @jest-environment jsdom
 */

import {
  loginEmail,
} from '../src/firebase/firebase-auth';

import { handleSubmit } from '../src/view/login-signUp/login.js';
// import { verificarUsuario } from '../src/view/verificar-usuario';

jest.mock('../src/firebase/firebase-config');
jest.mock('../src/view/verificar-usuario');

// describe('SignIn', () => {
//   it('handleSubmit', (done) => {
//     global.localStorage = {
//       setItem(key, value) {
//         expect(key).toBe('user');
//         expect(value).toBe(JSON.stringify({ emailVerified: true }));
//         polling setInterval, detener después de x intentos
//       },
//     };
//     global.window = {
//       location: {
//         hash: '',
//       },
//     };
//     handleSubmit({
//       preventDefault: () => {},
//       target: {
//         querySelector: (sel) => {
//           if (sel === '#login-email') {
//             return 'correo@email.com';
//           } if (sel === '#login-password') {
//             return 'password';
//           }
//         },
//       },
//     }).then(() => {
//       expect(loginEmail.mock.calls[0][0]).toBe('correo@email.com');
//       done();
//     });

jest.mock('../src/firebase/firebase-auth');

describe('handleSubmit', () => {
  beforeAll((done) => {
    document.body.innerHTML = '';
    done();
  });

  it('handleSubmit', (done) => {
    document.body.innerHTML = `
    <input type="email" id="login-email"   value='email@gmail.com' >
    <input type="password" id="login-password"   value='password'> `;
    console.log(document.querySelector('#login-password').value);
    handleSubmit({
      preventDefault: () => {},

    }).then(() => {
      expect(loginEmail.mock.calls[0][0]).toBe('email@gmail.com');
      expect(loginEmail.mock.calls[0][1]).toBe('password');
      done();
    }).catch(done);
  });
});

// describe('SignIn', () => {
//   it('handleSubmit', () => {
// global.localStorage = {
//   setItem(key, value) {
//     expect(key).toBe('user');
//     expect(value).toBe(JSON.stringify({ emailVerified: true }));
//     // polling setInterval, detener después de x intentos
//   },
// };
// global.window = {
//   location: {
//     hash: '',
//   },
// };
//     handleSubmit({
//       preventDefault: () => {},
//       target: {
//         querySelector: (sel) => {
//           if (sel === '#login-email') {
//             return 'correo@email.com';
//           } if (sel === '#login-password') {
//             return 'password';
//           }
//         },
//       },
//     });
//   });
// });
// loginEmail('email', 'password').then((userCredential) => {
//   expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('email');
//   expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('password');
// })
