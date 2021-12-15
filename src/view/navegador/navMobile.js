export const navMobile = () => {
  const viewNavMobile = document.createElement('nav');
  viewNavMobile.classList.add('nav-mobile');
  viewNavMobile.innerHTML = `
    <ul class="menu">
    <li><i id="btn-home" class="fas fa-home"></i></li>
    <li><i id="btn-search" class="fas fa-bell"></i></li>
    <li><span class = "btn-newPost-mobile"><i id="btn-post-mobile" class="fas fa-plus-circle"></i></span></li>
    <li><i  id="btn-profile"class="fas fa-user-circle"></i></li>
    <li><i id="logout-mob" class="fas fa-sign-out-alt"></i></a></li>
    </ul>
    `;

  return viewNavMobile;
};

export const navChangeView = () => {
  const btnNabMobile = document.querySelector('.nav-mobile');
  btnNabMobile.addEventListener('click', (e) => {
    const btnNav = e.target.id;
    if (btnNav === 'btn-home') {
      window.location.hash = '#/home';
    } else if (btnNav === 'btn-profile') {
      window.location.hash = '#/profile';
    }
  });
};
