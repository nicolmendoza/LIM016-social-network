export const navLaptop = () => {
  const userCurrent = JSON.parse(localStorage.getItem('user'));
  console.log(userCurrent);
  const viewNavLaptop = document.createElement('nav');
  viewNavLaptop.classList.add('nav-full');
  viewNavLaptop.innerHTML = `
    <div class="logo-full-screen"> QUEEN CODERS </div>
    <div class="container-search">
        <input type="text" class="search" placeholder="Search for people, tag, ..."> 
        <button class="btn-search"> <ion-icon name="search-outline"></ion-icon> </button>
    </div>
        <ul class="menuFull">
        <li><a href="#/home"><i class="fas fa-home"></i></a></li>
        <li><a href="#"><i class="fas fa-bell"></i></a></li>
        <li><a  href="#/home/profile/${userCurrent.uid}"><i class="fas fa-user-circle" id="myID" data-id="${userCurrent.uid}"></i></a></li>
        <li><i id="out" class="fas fa-sign-out-alt"></i></li>
    </ul>
    `;

  viewNavLaptop.querySelector('#myID').addEventListener('click', (e) => {
    const idUser = e.target.dataset.id;
    localStorage.setItem('idUserRedirecionar', idUser); // almacenar el id del usuario a redireccionar
    window.location.href = `#/home/profile/${idUser}`;
    console.log('holi');
    console.log(idUser);
  });

  return viewNavLaptop;
};
