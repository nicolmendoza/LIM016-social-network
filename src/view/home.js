import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <div>WELCOME</div>
  <button id="logout">Log Out</button>`;

  return divElement;
};

export const LogOut = () => {
  document.querySelector('#logout').addEventListener('click', () => {
    const auth = getAuth();
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
