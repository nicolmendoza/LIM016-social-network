// eslint-disable-next-line import/no-unresolved
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <div>WELCOME</div>
  <div id="infoUser"></div>
  <img id="photoUser">
  <button id="logout">Log Out</button>`;

  return divElement;
};

export const LogOut = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      console.log(user);
      document.getElementById('infoUser').innerHTML = `Nombre:${user.displayName} Correo=${user.email}`;
      document.getElementById('photoUser').src = `${user.photoURL}`;
    } else {
      // User is signed out
      // ...
    }
  });

  document.querySelector('#logout').addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('log out');
        window.location.hash = '#/';
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });
};
