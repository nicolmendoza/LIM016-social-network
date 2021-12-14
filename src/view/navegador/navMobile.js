export const navMobile = () => {
  const viewNavMobile = document.createElement('nav');
  viewNavMobile.classList.add('nav-mobile');
  viewNavMobile.innerHTML = `
    <ul class="menu">
    <li><a href="#/home"><i class="fas fa-home"></i></a></li>
    <li><a href="#"><i class="fas fa-bell"></i></a></li>
    <li><span class = "btn-newPost-mobile"><i id="btn-post-mobile" class="fas fa-plus-circle"></i></span></li>
    <li><a href="#/profile"><i class="fas fa-user-circle"></i></a></li>
    <li><i id="logout-mob" class="fas fa-sign-out-alt"></i></a></li>
    </ul>
    `;

  return viewNavMobile;
};
