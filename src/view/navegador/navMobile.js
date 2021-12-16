export const navMobile = () => {
  const viewNavMobile = document.createElement('nav');
  viewNavMobile.classList.add('nav-mobile');
  viewNavMobile.innerHTML = `
    <ul class="menu">
    <li><a href="#/home"><i class="fas fa-home"></i></a></li>
    <li><a href="#/home"><i id="btn-search" class="fas fa-bell"></i></a></li>
    <li><span class = "btn-newPost-mobile"><i id="btn-post-mobile" class="fas fa-plus-circle"></i></span></li>
    <li><a href="#/home/profile"><i class="fas fa-user-circle"></i></a></li>
    <li><i id="logout-mob" class="fas fa-sign-out-alt"></i></li>
    </ul>
    `;

  return viewNavMobile;
};

// export const navChangeView = () => {
//   const btnNabMobile = document.querySelector('.nav-mobile');
//   btnNabMobile.addEventListener('click', (e) => {
//     const btnNav = e.target.id;
//     if (btnNav === 'btn-home') {
//       window.location.hash = '#/home';
//     } else if (btnNav === 'btn-profile') {
//       window.location.hash = '#/home/profile';
//     }
//     // else if (btnNav === 'btn-search') {
//     //   window.location.hash = '#/editProfile';
//     // }
//   });
// };
