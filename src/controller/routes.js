// eslint-disable-next-line import/no-unresolved
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import { currentUser } from '../firebase/firebase.js';

import { components } from '../view/index.js';

// onst auth = getAuth();

const changeView = (route) => {
  const user = currentUser().currentUser;
  const container = document.getElementById('container');
  container.innerHTML = '';
  const footer = document.getElementById('container-footer');
  footer.innerHTML = '';
  const header = document.getElementById('container-header');
  header.innerHTML = '';

  switch (route) {
    case '#':
    case '/':
    case '#/login':
    case '#/':
      container.innerHTML = '';
      container.appendChild(components.login.Login());
      components.login.initLogin();

      break;

    case '#/signup':
      container.innerHTML = '';
      container.appendChild(components.signup.SignUp());
      components.signup.Register();
      break;

    case '#/home': {
      if (user) {
        container.innerHTML = '';
        header.appendChild(components.navLaptop.navLaptop());
        footer.appendChild(components.navMobile.navMobile());
        components.navMobile.navChangeView();
        (components.home.Home());
        components.home.FunctionsHome();
      } else {
        window.location.hash = '#/';
      }

      break;
    }
    case '#/profile': {
      if (user) {
        container.innerHTML = '';
        header.appendChild(components.navLaptop.navLaptop());
        footer.appendChild(components.navMobile.navMobile());
        components.navMobile.navChangeView();
        components.profile.Profile();
        components.profile.FunctionProfile();
      } else {
        window.location.hash = '#/';
      }

      break;
    }
    case '#/resetPassword':
      container.innerHTML = '';
      container.appendChild(components.resetPassword.resetPassword());
      components.resetPassword.resetPasswordInit();
      break;

    case '#/newPost':
      container.innerHTML = '';
      footer.appendChild(components.navMobile.navMobile());
      components.newPost.newPost();
      components.newPost.functionNewPost();

      break;

    case '#/editProfile':
      if (user) {
        container.innerHTML = '';
        footer.appendChild(components.navMobile.navMobile());
        container.appendChild(components.edit.profileEdit());
        components.edit.FunctionEdit();
      } else {
        window.location.hash = '#/';
      }

      break;
    default:

      break;
  }
};

export { changeView };
