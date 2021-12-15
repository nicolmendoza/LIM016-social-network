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
      container.appendChild(components.login.Login());
      components.login.initLogin();

      break;

    case '#/signup':
      container.appendChild(components.signup.SignUp());
      components.signup.Register();
      break;

    case '#/home': {
      if (user) {
        header.appendChild(components.navLaptop.navLaptop());
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
        header.appendChild(components.navLaptop.navLaptop());
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

    case '#/newPost':
      if (user) {
        footer.appendChild(components.navMobile.navMobile());
        components.newPost.newPost();
        // container.appendChild(components.newPost.newPost());
        components.newPost.functionNewPost();
      } else {
        window.location.hash = '#/home';
      }
      break;

    case '#/editProfile':
      if (user) {
        footer.appendChild(components.navMobile.navMobile());
        container.appendChild(components.edit.profileEdit());
        components.edit.FunctionEdit();
      } else {
        window.location.hash = '#/';
      }

      break;
    default:
      window.location.hash = '#/';
      break;
  }
};

// export const stateChanged = (callback) => onAuthStateChanged(auth, callback);

// stateChanged((userOne) => {
//   if (userOne) {
//     user = userOne;
//     const verificar = userOne.emailVerified;
//     if (verificar) {
//       changeView('#/home');
//     }
//   } else {
//     user = '';
//     changeView('#/');
//   }
// });

export { changeView };
