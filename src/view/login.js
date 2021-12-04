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
  <div class="form-group-text">
    <div class="textForm clickLogin">
    <a href="#/login">Login</a> </div>
    <div class="textForm">
    <a href="#/signup" >Sign Up</a> </div>
  </div>

  <form id="login-form">
    <div class="form-group">
      <span class="icon-input">
        <i class="far fa-envelope"></i>
      </span>
      <input type="email" id="login-email"  placeholder="correo@example.com" required >
    </div>
    <div class="form-group">
      <span class="icon-input" id="icon-eye">
        <i class="fas fa-eye-slash"></i>
      </span>
      <input type="password" id="login-password"  placeholder="****************" required >
    </div>
    <p id="generalMessage" class="errorMessage"></p>
    <button type="submit" class="btnLogin">LOGIN</button><br>
    <div class="divResetPassword">
    <a href="#/resetPassword" id="resetPass"> Forgot password?</a></div>
    
    <button type="button" class="icon-login" id="googleLogin"><img src="img/google.png"></i></button>
    <button type="button" class="icon-login" id="facebookLogin"><img src="img/facebook.png"></button>
    <button type="button" class="icon-login" id="githubLogin"><img src="img/github.png"></button>

    <div class="textResetPassword">
    <p class="registerText">Don’t you have an account?  <a href="#/signup" class="registerText link">Register now</a></p></div>
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
        const errorMessage = error.message;
        console.log(errorMessage);

        const message = document.getElementById('generalMessage');

        if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
          message.innerHTML = 'Usuario no encontrado';
        }

        if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
          message.innerHTML = 'Contraseña incorrecta.';
        } else if (errorMessage === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
          message.innerHTML = 'Usted excedió el número de intentos fallidos. Reestablezca su contraseña o inténtelo más tarde.';
        }
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
        console.log('github sign in');
        window.location.hash = '#/home';
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.

        const user = result.user;
        console.log(user);
        alert(`Bienvenida ${user.displayName}`);
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

  const iconEye = document.querySelector('#icon-eye');

  iconEye.addEventListener('click', function () {
    const icon = this.querySelector('i');

    if ((this.nextElementSibling).type === 'password') {
      this.nextElementSibling.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      this.nextElementSibling.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
  
};
