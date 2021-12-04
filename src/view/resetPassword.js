// eslint-disable-next-line import/no-unresolved
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

export const resetPassword = () => {
  const viewResetPassword = document.createElement('div');
  viewResetPassword.innerHTML = `
    <div class="logo">SOCIAL NETWORK</div>
    <div><img id="logoLogin" src='./img/lock.png' style="width:195px"></div>
    
    <form id="resetPasswordBtn">
      <div class= "textReset" style="font-size: 22px;">¿Tienes problemas para iniciar sesión?</div>
      <div class= "textReset" style="font-size: 17px;">Ingresa tu correo y te enviaremos <br> un enlace para que recuperes <br> el acceso a tu cuenta</div>
      <input type="email" class="input-reset" id="resetEmail"  placeholder="correo@example.com" required >
      <button type="submit" class="btnLogin">ENVIAR</button>
    </form>
    
    <section class="modalReset" style="display: flex">
      <div class="modalDiv"> 
      <div>
      <div id="far">
        <i class="far fa-times-circle"></i>
      </div>
      <div>
        <h>Correo electronico enviado</h>
        <p>Enviamos un correo electronico a <b class="emailText"></b> con un enlace para que recuperes el acceso a tu cuenta</p> 
        <button class="aceptReset"><a href="#/login">ACEPTAR</a></button>
      </div>
      </div>
      </div>
    </section>`;

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
        document.querySelector('.modalReset').style.display = 'flex';
        const emailText = document.querySelector('.emailText');
        emailText.innerHTML = `${email}`;

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
