// eslint-disable-next-line import/no-unresolved
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  const auth = getAuth();
  const user = auth.currentUser;
  switch (route) {
    case '#':
    case '/':
    case '#/login':
    case '#/': {
      if (!user) {
        container.appendChild(components.login.Login());
        components.login.initLogin();
      } else {
        window.location.hash = '#/home';
      }
      break;
    }

    case '#/signup':
      container.appendChild(components.signup.SignUp());
      components.signup.Register();
      break;

    case '#/home': {
      if (user) {
        (components.home.Home());
        components.home.FunctionsHome();
      } else {
        window.location.hash = '#/';
      }

      break;
    }
    case '#/profile': {
      if (user) {
        components.profile.Profile();
        components.profile.FunctionProfile();
      } else {
        window.location.hash = '#/';
      }

      break;
    }
    case '#/resetPassword':
      container.appendChild(components.resetPassword.resetPassword());
      components.resetPassword.resetPasswordInit();
      break;
    default:
      window.location.hash = '#/';
      break;
  }
};

export { changeView };
