import {
  getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const Login = () => {
  const viewHome = document.createElement('div');

  viewHome.innerHTML = `
<div>SOCIAL NETWORK</div>
<div><img id="logoLogin" src='./img/logoLogin.png' ></div>
<div>
 <a href="#/login">Login</a>
  <a href="#/signup" >Sign Up</a>
</div>
<div>LOGIN</div>
<form id="login-form">
<div class="form-group">
  <input type="text" id="login-email"  placeholder="Title" >
</div>
<div class="form-group">
  <input type="password" id="login-password"  placeholder="Password" >
</div>
<button type="submit" >Login</button>
<button type="button"  id="googleLogin">Login with Google</button>
<button type="button"  id="facebookLogin">Login with Facebook</button>
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
        console.log(user);
        console.log(email, password);
        console.log('ingresando');
        window.location.hash = '#/home';
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
    // eslint-disable-next-line no-undef
    e.preventDefault();
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

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
};
