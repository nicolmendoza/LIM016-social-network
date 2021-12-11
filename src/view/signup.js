// eslint-disable-next-line import/no-unresolved
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const SignUp = () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('sectionLogin');
  viewSignUp.innerHTML = `
  <section class="bubble">
  <!-- content here -->
</section>
  <div class="section1"><img class="imgInicio"></div>
  <div class="section2">
  <div class="formulario">
    <div class="logo">SOCIAL NETWORK</div>
    <div><img id="logoLogin" class="imgInicioPequeño" src='./img/imgLogo.png' ></div>
    <div class="form-group-text">
      <div class="textForm">
        <a href="#/login">Login</a> </div>
      <div class="textForm clickSingUp">
        <a href="#/signup" >Sign Up</a> </div>
    </div>

    <form id="signup-form">
    <div class="form-group">
      <span class="icon-input">
        <i class="far fa-user-circle"></i>
      </span>
    <input type="text" id="signup-name"  placeholder="Name" required>
    <p id='nameMessage' class="errorMessage"></p>
  </div>
      <div class="form-group">
        <span class="icon-input">
          <i class="far fa-envelope"></i>
        </span>
        <input type="text" id="signup-email"  placeholder="correo@example.com" required>
        <p id='emailMessage' class="errorMessage"></p>
      </div>
      <div class="form-group">
        <span class="icon-input" id="icon-eye">
          <i class="fas fa-eye-slash"></i>
        </span>
        <input type="password" id="signup-password"  placeholder="**************" required>
        <p id='passwordMessage' class="errorMessage"></p>

      </div>
      <button type="submit" class="btnLogin" >CREATE A COUNT</button>

      <div class="textResetPassword">
    <p class="registerText">Do you have an account?  <a href="#/signup" class="registerText link">Login now</a></p></div>
    </form>
    </div>
    </div>`;

  return viewSignUp;
};

// minlength='8' maxlength='16' pattern="(?=.*[0-9]{2,14})(?=.*[a-zA-Z]{2,14})">

export const Register = () => {
  const signupForm = document.querySelector('#signup-form');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#signup-name').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    // const nameMessage = document.getElementById('nameMessage');
    // const emailMessage = document.getElementById('emailMessage');
    // const passwordMessage = document.getElementById('passwordMessage');

    // if (name === null || name === '') {
    //   nameMessage.innerHTML = 'Ingresa tu nombre de usuaria.';
    // } else {
    //   nameMessage.innerHTML = '';
    // }
    // ------------FIREBASE------------------
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            console.log('correo enviado');
            alert('correo enviado');
            window.location.hash = '#/';
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
};
