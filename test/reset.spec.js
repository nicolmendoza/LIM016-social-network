/**
 * @jest-environment jsdom
 */

import {
  resetPasswordFirebase,
} from '../src/firebase/firebase-auth';

import { handleReset } from '../src/view/resetPassword.js';

jest.mock('../src/firebase/firebase-config');
jest.mock('../src/firebase/firebase-auth');

describe('handleReset', () => {
  // Creamos primero nuestro dom virtual usando nuestro index
  beforeAll((done) => {
    document.body.innerHTML = '';
    done();
  });
  it('handleReset', (done) => {
    document.body.innerHTML = `
      <input type="email" class="input-reset" id="resetEmail" value="merly2257@gmail.com" />
      <div class="modalReset">
        <b class="emailText"></b>
      </div>
    `;
    handleReset({
      preventDefault: () => {},
    }).then(() => {
      expect(document.querySelector('.emailText').innerHTML).toBe('merly2257@gmail.com');
      expect(resetPasswordFirebase.mock.calls[0][0]).toBe('merly2257@gmail.com');

      done();
    }).catch(done);
  });
});
