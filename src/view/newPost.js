import { currentUser, savePost } from '../firebase.js';

export const newPost = () => {
  const newPostContainer = document.createElement('section');
  newPostContainer.classList.add('containerNewPost');
  newPostContainer.innerHTML = `
    <div class="header-newPost">
        <button class="descart"><a href="#/home"> Descartar </a></button>
        <div> CREAR </div>
        <button type="submit" class="publish">PUBLISH</button>
    </div>

    <div class="info-user">
        <div class="photo"><img id="photoUser"></div>
        <div class="name-user">
            <div id=name></div>
            <select class="privacity">
                <option value="amigos"><i class="fas fa-bell"></i>Amigos
                <option value="solo yo"><i class="fas fa-bell"></i>Solo yo
            </select>
        </div>
    </div>

    <textarea name="textarea" id="post-description" rows="10" cols="50" placeholder="What's on you mind?"></textarea>

    <div class="plus-image"><b>+</b></div>
    `;

  return newPostContainer;
};

export const functionNewPost = () => {
  // autentificando usuario logueado
  const userCurrent = currentUser().currentUser;

  const info = document.getElementById('name');
  info.innerHTML = `${userCurrent.displayName}`;

  document.getElementById('photoUser').src = `${userCurrent.photoURL}`;

  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;
  console.log(nameUser);

  const postDescription = document.getElementById('post-description');
  document.querySelector('.publish').addEventListener('click', async () => {
    savePost(postDescription, userID, nameUser);
    window.location.hash = '#/home';
  });
};
