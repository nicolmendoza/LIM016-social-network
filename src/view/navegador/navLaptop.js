import { getUsers } from '../../firebase/firestore.js';

export const navLaptop = () => {
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  const viewNavLaptop = document.createElement('nav');
  viewNavLaptop.classList.add('nav-full');
  viewNavLaptop.innerHTML = `
    <div class="logo-full-screen"> QUEEN CODERS </div>
    <div class="container-search">
        <input type="text" class="search" id="search" placeholder="Search for people, tag, ..." autocomplete="off">
    <div class="container-result-search" >
        <ul class="result-search" id="result-search" style="display:none"></ul>
    </div>        
    </div>
        <ul class="menuFull">
        <li><a href="#/home"><i class="fas fa-home"></i></a></li>
        <li><a href="#"><i class="fas fa-bell"></i></a></li>
        <li><a  href="#/home/profile/${userCurrent.uid}"><i class="fas fa-user-circle" id="myID" data-id="${userCurrent.uid}"></i></a></li>
        <li><i id="out" class="fas fa-sign-out-alt"></i></li>
    </ul>
    `;

  const inputSearch = viewNavLaptop.querySelector('#search');
  const resultSearch = viewNavLaptop.querySelector('#result-search');

  // console.log(dataUsers);

  inputSearch.addEventListener('keyup', () => {
    const search = inputSearch.value.toLowerCase();
    console.log(search);
    const searchUsers = (data) => {
      const arrayUsers = data.filter((user) => user.name.toLowerCase().includes(search));
      const resultHtml = arrayUsers.map(
        (user) => `
      <li id="${user.userUID}" class="li-user"><span>${user.name}</span></li>`,
      );

      if (search === '' || arrayUsers.length === 0) {
        document.querySelector('.result-search').style.display = 'none';
        resultSearch.innerHTML = '';
      } else {
        resultSearch.innerHTML = resultHtml.join('');
        document.querySelector('.result-search').style.display = 'block';
        viewNavLaptop.querySelectorAll('.li-user').forEach((list) => {
          list.addEventListener('click', () => {
            const idList = list.id;
            console.log(idList);
            localStorage.setItem('idUserRedirecionar', idList); // almacenar el id del usuario a redireccionar
            window.location.href = `#/home/profile/${idList}`;
          });
        });
      }
    };
    getUsers().then((data) => searchUsers(data));
  });

  viewNavLaptop.querySelector('#myID').addEventListener('click', (e) => {
    const idUser = e.target.dataset.id;
    localStorage.setItem('idUserRedirecionar', idUser); // almacenar el id del usuario a redireccionar
    window.location.href = `#/home/profile/${idUser}`;
    console.log('holi');
    console.log(idUser);
  });

  return viewNavLaptop;
};
