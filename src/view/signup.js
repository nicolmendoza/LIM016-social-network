// eslint-disable-next-line import/no-unresolved
import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const SignUp = () => {
  const viewSignUp = `
    <div class="logo">SOCIAL NETWORK</div>
    <div><img id="logoLogin" src='./img/imgLogo.png' ></div>
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
  </div>
      <div class="form-group">
        <span class="icon-input">
          <i class="far fa-envelope"></i>
        </span>
        <input type="text" id="signup-email"  placeholder="correo@example.com" required>
        <p id='emailMessage'></p>
      </div>
      <div class="form-group">
        <span class="icon-input" id="icon-eye">
          <i class="fas fa-eye-slash"></i>
        </span>
        <input type="password" id="signup-password"  placeholder="**************" required>
        <p id='passwordMessage'></p>

      </div>
      <button type="submit" class="btnLogin" >CREATE A COUNT</button>

      <div class="textResetPassword">
    <p class="registerText">Do you have an account?  <a href="#/signup" class="registerText link">Login now</a></p></div>

    </form>`;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewSignUp;
  return divElement;
};

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
        updateProfile(auth.currentUser, {
          displayName: document.getElementById('signup-name').value,
          photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          console.log(error);
        });

        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
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
