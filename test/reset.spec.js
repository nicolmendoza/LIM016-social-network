/* eslint-disable import/order */
/* eslint-disable import/first */
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

import { handleReset, resetPassword } from '../src/view/resetPassword.js';

jest.mock('../src/firebase/firebase-config');
jest.mock('../src/firebase/firebase-auth');

describe('handleReset', () => {
  beforeEach(() => {
    const dom = new JSDOM(resetPassword);
    dom.window.document.querySelector('#resetEmail').value = 'merly@gmail.com';
    const { document } = dom.window;
  });
  it('handleReset', () => {
    handleReset({ preventDefault: () => {} });
  });
});
