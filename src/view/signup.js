// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const SignUp = () => {
  const viewSignUp = `
    <div>SOCIAL NETWORK</div>
    <div><img id="logoLogin" src='./img/logoLogin.png' ></div>
    <div>
     <a href="#/login">Login</a>
      <a href="#/signup" >Sign Up</a>
    </div>
    <div>SIGN UP</div>
    <form id="signup-form">
      <div >
        <input type="text" id="signup-email"  placeholder="Title" >
      </div>
      <div >
        <input type="password" id="signup-password"  placeholder="Password" >
      </div>
      <button type="submit" >Save changes</button>
    </form>`;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewSignUp;
  return divElement;
};

// function verificar() {
//   const auth = getAuth();
//   sendEmailVerification(auth.currentUser)
//     .then(() => {
//     // Email verification sent!
//     // ...
//     });
// }

export const Register = () => {
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    // firebase
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
            // Email verification sent!
            // ...
              console.log('correo enviado');
            });
        }

        console.log('usuario creeado');
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  });
};
