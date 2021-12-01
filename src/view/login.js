/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const Login = () => {
  const viewHome = document.createElement('div');

  viewHome.innerHTML = `
  <div class="logo">SOCIAL NETWORK</div>
  <div><img id="logoLogin" src='./img/imgLogo.png' ></div>
  <div>
    <a href="#/login">Login</a>
    <a href="#/signup" >Sign Up</a>
  </div>
  <div>LOGIN</div>

  <form id="login-form">
    <div class="form-group">
      <input type="email" id="login-email"  placeholder="correo@example.com" >
    </div>
    <div class="form-group">
      <input type="password" id="login-password"  placeholder="****************" >
    </div>
    <a href="#/resetPassword" id="resetPass"> ¿Has olvidado tu contraseña?</a><br>
    <button type="submit" class="btnLogin">LOGIN</button>
    <button type="button" id="googleLogin"><i class="fab fa-google"></i></button>
    <button type="button" id="facebookLogin"><i class="fab fa-facebook-square"></i></button>
    <button type="button" id="githubLogin"><i class="fab fa-github"></i></button>
  </form>`;

  return viewHome;
};

export const initLogin = () => {
  const signInForm = document.querySelector('#login-form');

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    // codings firebase
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user.emailVerified === true) {
          window.location.hash = '#/home';
        } else {
          alert('te enviamos un correo para verificar tu cuenta, revisa tu bandeja');
        }
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  });

  document.querySelector('#googleLogin').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        window.location.hash = '#/home';
        console.log('ingresando con correo google');
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
      });
  });

  document.querySelector('#facebookLogin').addEventListener('click', () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('facebook sign in');
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        console.log(credential);
        console.log(user);
        window.location.hash = '#/home';
        // const accessToken = credential.accessToken;
        // ...
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error);

        // // ...
        console.log(error);
      });
  });

  document.getElementById('githubLogin').addEventListener('click', () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        // const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
      });
  });
};
