// eslint-disable-next-line import/no-unresolved
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import { components } from '../view/index.js';

const auth = getAuth();
let user;

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  const footer = document.getElementById('container-footer');
  footer.innerHTML = '';

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
        footer.appendChild(components.navMobile.navMobile());
        (components.home.Home());
        components.home.FunctionsHome();
      } else {
        window.location.hash = '#/';
      }

      break;
    }
    case '#/profile': {
      if (user) {
        footer.appendChild(components.navMobile.navMobile());
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

    // case '#/newPost':
    //   container.appendChild(components.newPost.newPost());
    //   components.newPost.functionNewPost();
    //   break;

    default:
      window.location.hash = '#/';
      break;
  }
};

onAuthStateChanged(auth, (userOne) => {
  if (userOne) {
    user = userOne;
    changeView('#/home');
  } else {
    user = '';
    changeView('#/');
  }
});

export { changeView };
