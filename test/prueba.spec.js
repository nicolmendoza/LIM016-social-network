/**
 * @jest-environment jsdom
 */

import {
  loginEmail,
} from '../src/firebase/firebase-auth';

import { handleSubmit } from '../src/view/login-signUp/login.js';

jest.mock('../src/firebase/firebase-config');
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
    console.log(document.querySelector('#login-password'));
    handleSubmit({
      preventDefault: () => {},

    }).then(() => {
      console.log(document.querySelector('#login-password'));
      console.log(loginEmail.mock.calls);
      // expect(loginEmail.mock.calls[0][1]).toBe('email@gmail.com');
      // expect(loginEmail.mock.calls[0][2]).toBe('password');
      done();
    });
  });
});
