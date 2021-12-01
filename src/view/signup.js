// eslint-disable-next-line import/no-unresolved
import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

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
    <div>
    <input type="text" id="signup-name"  placeholder="Name" required>
  </div>
      <div>
        <input type="text" id="signup-email"  placeholder="Email" required>
      </div>
      <div>
        <input type="password" id="signup-password"  placeholder="Password" required>
      </div>
      <button type="submit" >Save changes</button>
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
            alert('correo enviado');
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
