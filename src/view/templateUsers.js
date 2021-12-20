import { getUsers } from '../firebase/firestore.js';

export const templateUsers = () => {
  const divUsers = document.createElement('div');
  divUsers.classList.add('divUsers');
  const arrayUsers = getUsers();
  arrayUsers.then((users) => users.forEach((user) => {
    divUsers.innerHTML += `
  <div class="link-user" >
  <div class="oneDivUser" >
  <img src=${user.photo} data-id="${user.userUID}" class="img-user" >
  <p class="oneDivUser-parrafo"  data-id="${user.userUID}">${user.name}</p>
  </div>
  </div>
  `;
    document.querySelectorAll('.oneDivUser-parrafo').forEach((link) => {
      link.addEventListener('click', (e) => {
        const idUser = e.target.dataset.id;
        localStorage.setItem('idUserRedirecionar', idUser); // almacenar el id del usuario a redireccionar
        window.location.href = `#/home/profile/${idUser}`;
        console.log('holi');
        console.log(idUser);
      });
    });

    document.getElementById('sectionUsers').innerHTML = '';
    document.getElementById('sectionUsers').appendChild(divUsers);
  }));
};

// export const addEventLinkUser = () => {

// eslint-disable-next-line max-len
//       // localStorage.setItem('idUserRedirecionar', idUser); // almacenar el id del usuario a redireccionar
//       // window.location.href = `#/profile/${idUser}`;
//       // window.location.reload();
//     });
//   });
// };
