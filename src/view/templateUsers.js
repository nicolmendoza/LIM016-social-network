import { getUsers } from '../firebase/firestore.js';

export const templateUsers = () => {
  const divUsers = document.createElement('div');
  divUsers.classList.add('divUsers');
  const arrayUsers = getUsers();
  arrayUsers.then((users) => users.forEach((user) => {
    divUsers.innerHTML += `
  <div  id="${user.userUID}" class="div">
  <div class="oneDivUser">
  <p class="oneDivUser-parrafo">${user.name}</p>
  <img src=${user.photo} class="img-user" >
  </div>
  </div>
  `;

    document.getElementById('sectionUsers').innerHTML = '';
    document.getElementById('sectionUsers').appendChild(divUsers);
  }));
};
