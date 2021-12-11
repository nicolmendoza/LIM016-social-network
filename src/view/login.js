import {
  loginEmail,
  loginGoogle,
  loginFacebook,
  loginGitHub,
} from '../firebase.js';

export const Login = () => {
  const viewHome = document.createElement('div');
  viewHome.classList.add('sectionLogin');
  viewHome.innerHTML = `
  <section class="bubble">
    <!-- content here -->
  </section>

  <div class="section1"><img class="imgInicio"></div>
  <div class="section2">
    <div class="formulario">
      <div class="logo">SOCIAL NETWORK</div>
      <div><img id="logoLogin" class="imgInicioPequeño" src='./img/imgLogo.png'></div>

      <div class="form-group-text">
        <div class="textForm clickLogin">
          <a href="#/login">Login</a> 
        </div>
        <div class="textForm">
          <a href="#/signup" >Sign Up</a>
        </div>
      </div>

      <form id="login-form">
        <div class="form-group">
          <span class="icon-input">
            <i class="far fa-envelope"></i>
          </span>
          <input type="email" id="login-email" placeholder="correo@example.com" required>
        </div>

        <div class="form-group">
          <span class="icon-input" id="icon-eye">
            <i class="fas fa-eye-slash"></i>
          </span>
          <input type="password" id="login-password"  placeholder="****************" required>
        </div>

        <p id="generalMessage" class="errorMessage"></p>
        <button type="submit" class="btnLogin">LOGIN</button><br>
        <div class="divResetPassword">
          <a href="#/resetPassword" id="resetPass"> Forgot password?</a>
        </div>
        
        <button type="button" class="icon-login" id="googleLogin"><img src="img/google.png"></i></button>
        <button type="button" class="icon-login" id="facebookLogin"><img src="img/facebook.png"></button>
        <button type="button" class="icon-login" id="githubLogin"><img src="img/github.png"></button>
        <div class="textResetPassword">
          <p class="registerText">Don’t you have an account? <a href="#/signup" class="registerText link">Register now</a></p>
        </div>
      </form>
    </div>
  </div>`;

  return viewHome;
};

export const initLogin = () => {
  const signInForm = document.querySelector('#login-form');
  /* ................................... */
  const googleLogin = document.querySelector('#googleLogin');
  const facebookLogin = document.querySelector('#facebookLogin');
  const githubLogin = document.getElementById('githubLogin');
  /* ................................... */
  const message = document.getElementById('generalMessage');

  /* ........Ingreso correcto....... */
  function correctEntry() {
    window.location.hash = '#/home';
  }

  /* ........Errorres para ingresar....... */
  function errorOccurs(typeError) {
    const errorCode = typeError.code;
    switch (errorCode) {
      case 'auth/user-not-found':
        message.innerHTML = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        message.innerHTML = 'Contraseña incorrecta.';
        break;
      case 'auth/too-many-requests':
        message.innerHTML = 'Usted excedió el número de intentos fallidos. Reestablezca su contraseña o inténtelo más tarde.';
        break;
      case 'auth/invalid-email':
        message.innerHTML = 'La dirección de correo electrónico no es válida';
        break;
      default:
        message.innerHTML = 'Lo sentimos, se ha producido un error en la página.';
    }
  }

  /* .........Logearse con correo........ */
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.childNodes[1].childNodes[3].value;
    // const email = document.querySelector('#login-email').value;
    const password = e.target.childNodes[3].childNodes[3].value;
    // const password = document.querySelector('#login-password').value;

    loginEmail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === true) {
          correctEntry();
        } else {
          alert('Te hemos enviado un email para verificar tu cuenta. Por favor revisa tu bandeja.');
        }
      })
      .catch((error) => {
        errorOccurs(error);
      });
  });

  /* ........Logearse con Google........ */
  googleLogin.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        correctEntry();
      }).catch((error) => {
        errorOccurs(error);
      });
  });

  /* .......Logearse con Facebook........ */
  facebookLogin.addEventListener('click', () => {
    loginFacebook()
      .then(() => {
        correctEntry();
      })
      .catch((error) => {
        errorOccurs(error);
      });
  });

  /* .......Logearse con GitHub........ */
  githubLogin.addEventListener('click', () => {
    loginGitHub()
      .then(() => {
        correctEntry();
      }).catch((error) => {
        errorOccurs(error);
      });
  });

  /* .....Función ocultar y mostrar contraseña..... */
  const iconEye = document.querySelector('#icon-eye');
  // eslint-disable-next-line func-names
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
