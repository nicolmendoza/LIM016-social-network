// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const SignUp = () => {
  const viewSignUp = `
    <div>SOCIAL NETWORK</div>
    <div><img id="logoLogin" src='./img/imgLogo.png' ></div>
    <div>
     <a href="#/login">Login</a>
      <a href="#/signup" >Sign Up</a>
    </div>
    <div>SIGN UP</div>
    <form id="signup-form">
      <div >
        <input type="text" id="signup-user"  placeholder="Name user" >
      </div>
      <div >
        <input type="email" id="signup-email"  placeholder="correo@example.com" >
        <p id='emailMessage'></p>
      </div>
      <div >
      <input type="password" id="signup-password"  placeholder="**************" >
        <p id='passwordMessage'></p>
      </div>        
      <button type="submit" class="btnLogin" >CREATE A COUNT</button>
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
              alert('Te enviamos un correo para verificar tu cuenta. Por favor, revisa tu bandeja.');
              console.log('correo enviado');
            });
        }

        console.log('usuario creado');
      })

      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        const emailMessage = document.getElementById('emailMessage');
        const passwordMessage = document.getElementById('passwordMessage');

        if (errorMessage === 'Firebase: Error (auth/missing-email).' || errorMessage === 'Firebase: Error (auth/invalid-email).') {
          emailMessage.innerHTML = 'Correo inválido.';
        } else if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
          emailMessage.innerHTML = 'Correo en uso.';
        } else {
          emailMessage.innerHTML = '';
        }

        if (password === '' || errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          passwordMessage.innerHTML = 'La contraseña debe tener como mínimo 6 carácteres';
        } else {
          passwordMessage.innerHTML = '';
        }
      });
  });
};
