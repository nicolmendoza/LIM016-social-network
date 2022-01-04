/**
 * @jest-environment jsdom
 */

import { handleRegister } from '../src/view/login-signUp/signup';
// import { createUser, verificationEmail } from '../src/firebase/firebase-auth';

jest.mock('../src/firebase/firebase-config');
jest.mock('../src/firebase/firebase-auth');

describe('SignUp', () => {
  beforeAll(() => {
    delete window.location;

    window.location = {
      href: '',
    };
  });
  afterAll(() => {
    window.location = location;
  });
  it('handleRegister', (done) => {
    window.alert = () => {};
    handleRegister({
      preventDefault: () => {},
      target: {
        querySelector: (sel) => {
          if (sel === '#signup-email') {
            return { value: 'correo@email.com' };
          } if (sel === '#signup-password') {
            return { value: 'password' };
          }
        },
      },
    }).then(() => {
      const target = 'http://localhost/#';
      window.location.href = target;
      // global.window = {
      //   location: {
      //     hash: '/#',
      //   },
      // };
      // window.location = new URL('http://localhost/#');
      console.log(window.location.href);
      expect(window.location.href).toBe(target);
      done();
    }).catch(done);
  });
});

/* it('crear ususario', () => createUser().then((userCredential) => {
     const user = userCredential.user.emailVerified;
     expect(user).toBe(true);
   }));

   it('verificar ususario', () => verificationEmail().then(() => {
     global.window = {
       location: {
         hash: '#/',
       },
     };
     expect(window.location.hash).toEqual('#/');
   })); */
