// eslint-disable-next-line import/no-unresolved
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <div>WELCOME</div>
  <img id="photoUser" width="100px">
  <div id="infoUser"></div>
  <button id="logout">Log Out</button>`;

  return document.getElementById('container').appendChild(divElement);
};

export const LogOut = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log(user);
    if (user.displayName == null) {
      const info = document.getElementById('infoUser');

      info.innerHTML = 'Bienvenida Developer';
    } else {
      const info = document.getElementById('infoUser');

      info.innerHTML = `Bienvenida ${user.displayName}`;
    }
    document.getElementById('photoUser').src = `${user.photoURL}`;
  } else {
  // No user is signed in.
  }

  document.querySelector('#logout').addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('log out');
        window.location.hash = '#/';
        // window.location.reload();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });
};
