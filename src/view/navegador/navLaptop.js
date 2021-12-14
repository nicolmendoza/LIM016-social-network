export const navLaptop = () => {
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
        <li><a href="#/profile"><i class="fas fa-user-circle"></i></a></li>
        <li><i id="out" class="fas fa-sign-out-alt"></i></li>
    </ul>
    `;

  return viewNavLaptop;
};
