import {
  createUser,
  verificationEmail,
} from '../../firebase/firebase-auth.js';

export const SignUp = () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('sectionLogin');
  viewSignUp.innerHTML = `
  <section class="bubble">
    <!-- content here -->
  </section>

  <section class="section1"><img class="imgInicio" name="imgInicio" ></section>

  <section class="section2">
    <div class="formulario">
      <div id="inicioLogo"> 
        <i class="fas fa-crown"></i>
        <p class="logo">QUEEN CODERS</p>
      </div>
      <div><img id="logoLogin" class="imgInicioPequeño" src='./img/imgLogo.png'></div>

      <div class="form-group-text">
        <div class="textForm">
          <a href="#/login">Login</a>
        </div>
        <div class="textForm clickSingUp">
          <a href="#/signup" >Sign Up</a>
        </div>
      </div>

      <form id="signup-form">
        <div class="form-group">
          <span class="icon-input">
            <i class="far fa-user-circle"></i>
          </span>
        <input type="text" id="signup-name"  placeholder="Name" required>
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
          <input type="password" id="signup-password"  placeholder="**************" maxlength='16'>
          <p id='passwordMessage' class="errorMessage"></p>
        </div>

        <button type="submit" class="btnLogin" >CREATE A COUNT</button>

        <div class="textResetPassword">
          <p class="registerText">Do you have an account?  <a href="#/signup" class="registerText link">Login now</a></p>
        </div>
      </form>
    </div>
  </section>`;
  return viewSignUp;
};

/* ...........Errores para registrase.......... */
function errorOccurs(typeError) {
  const emailMessage = document.getElementById('emailMessage');
  const passwordMessage = document.getElementById('passwordMessage');
  const errorCode = typeError.code;
  switch (errorCode) {
    case 'auth/invalid-email':
      emailMessage.innerHTML = 'La dirección de correo electrónico no es válida';
      break;
    case 'auth/email-already-in-use':
      emailMessage.innerHTML = 'Esta dirección de correo está en uso.';
      break;
    case 'auth/weak-password':
      passwordMessage.innerHTML = 'La contraseña debe tener como mínimo 6 carácteres';
      break;
    default:
      alert('Lo sentimos, se ha producido un error en la página. Vuelve a intentarlo más tarde.');
      console.log(typeError);
  }
}

export const handleRegister = (e) => {
  e.preventDefault();
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  createUser(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        alert('Te enviamos un correo para verificar tu cuenta. Por favor, revisa tu bandeja');
        verificationEmail()
          .then(() => {
            window.location.hash = '#/';
          });
      }
    })
    .catch((error) => {
      errorOccurs(error);
    });
};

export const Register = () => {
  const signupForm = document.querySelector('#signup-form');

  /* .......Registrarse con correo y contraseña...... */
  signupForm.addEventListener('submit', handleRegister);

  /* .....Función ocultar y mostrar contraseña..... */
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
  document.imgInicio.src = 'img/gif.gif';
};
