import { handleSubmit } from '../src/view/login-signUp/login.js';

jest.mock('../src/firebase/firebase-config');
jest.mock('../verificar-usuario.js');


describe('SignIn', () => {
  it('handleSubmit', () => {
    global.localStorage = {
      setItem(key, value) {
        expect(key).toBe('user')
        expect(value).toBe(JSON.stringify({ emailVerified: true }))
        // polling setInterval, detener después de x intentos
      }
    }
    global.window = {
      location: {
        hash: ''
      }
    }
    handleSubmit({
      preventDefault: () => {},
      target: {
        querySelector: (sel) => {
          if (sel === '#login-email') {
            return 'correo@email.com';
          } if (sel === '#login-password') {
            return 'password';
          }
          }
        }
      });
    });
  });
