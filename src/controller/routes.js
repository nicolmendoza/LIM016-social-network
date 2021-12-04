// eslint-disable-next-line import/no-unresolved
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#/login':
    case '#/':
      container.appendChild(components.login.Login());
      components.login.initLogin();
      break;
    case '#/signup':
      container.appendChild(components.signup.SignUp());
      components.signup.Register();
      break;

    case '#/home': {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        (components.home.Home());
        components.home.FunctionsHome();
      } else {
        window.location.hash = '#/';
      }

      break;
    }
    case '#/profile': {
      const auth = getAuth();
      const user = auth.currentUser;

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
