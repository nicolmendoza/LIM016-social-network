import { handleSubmit } from '../src/view/login-signUp/login.js';
import { verificarUsuario } from '../src/view/verificar-usuario';

import {
  loginEmail,
} from '../src/firebase/firebase-auth';

jest.mock('../src/firebase/firebase-config');
jest.mock('../src/view/verificar-usuario');


describe('SignIn', () => {
  it('handleSubmit', (done) => {
    global.localStorage = {
      setItem(key, value) {
        expect(key).toBe('user');
        expect(value).toBe(JSON.stringify({ emailVerified: true }));
        // polling setInterval, detener después de x intentos
      },
    };
    global.window = {
      location: {
        hash: '',
      },
    };
    handleSubmit({
      preventDefault: () => {},
      target: {
        querySelector: (sel) => {
          if (sel === '#login-email') {
            return 'correo@email.com';
          } if (sel === '#login-password') {
            return 'password';
          }
        },
      },
    }).then(() => {
      expect(loginEmail.mock.calls[0][0]).toBe('correo@email.com');
      done();
    });
  });
});
