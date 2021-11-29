// eslint-disable-next-line import/no-unresolved
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const resetPassword = () => {
  const viewResetPassword = document.createElement('div');
  viewResetPassword.innerHTML = ` 
    <form id="resetPasswordBtn">
    <label>Ingresa tu correo y te enviaremos un enlace para que recuperes el acceso a tu cuenta</label>
    <input type="email" id="resetEmail" placeholder="email@gmail.com" required>
    <button type="submit" >Recuperar contraseña</button>`;

  return viewResetPassword;
};

export const resetPasswordInit = () => {
  const resetP = document.querySelector('#resetPasswordBtn');

  resetP.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#resetEmail').value;
    console.log(email);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Reset Password successful');
      // Password reset email sent!
      // ..
      })
      .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ..
        console.log(error);
      });
  });
};
