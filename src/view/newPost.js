// import { currentUser, savePost } from '../firebase.js';

// export const newPost = () => {
//   const newPostContainer = document.createElement('section');
//   newPostContainer.classList.add('containerNewPost');
//   newPostContainer.innerHTML = `
//     <div class="header-newPost">
//         <button class="descart"><a href="#/home"> Descartar </a></button>
//         <div> CREAR </div>
//         <button type="submit" class="publish">PUBLISH</button>
//     </div>

//     <div class="info-user">
//         <div class="photo"><img id="photoUser"></div>
//         <div class="name-user">
//             <div id=name></div>
//             <select class="privacity">
//                 <option value="amigos"><i class="fas fa-bell"></i>Amigos
//                 <option value="solo yo"><i class="fas fa-bell"></i>Solo yo
//             </select>
//         </div>
//     </div>

//     <textarea name="textarea" id="post-description" rows="10" cols="50" placeholder="What's on you mind?"></textarea>
//     <div id="container-image-preview">
//       <img src="" class="image-preview" alt=""/>
//     </div>
//     <div class="add-element">
//     <div class="plus-image"><b>+</b></div>
//       <div class="addImage">
//         <button class= "addImg"><ion-icon name="image-outline"></ion-icon></ion-icon></button>
//         <input type="file" id="input-file" style="display:none" multiple/>
//         <button class= "add camara"><ion-icon name="camera-outline"></ion-icon></button>
//         <button class= "add video"><ion-icon name="videocam-outline"></ion-icon></button>
//         <button class= "add archive"><ion-icon name="attach-outline"></ion-icon></button>
//       </div>
//     </div>
//     `;

//   return newPostContainer;
// };

// export const functionNewPost = () => {
//   // autentificando usuario logueado
//   const userCurrent = currentUser().currentUser;

//   const info = document.getElementById('name');
//   info.innerHTML = `${userCurrent.displayName}`;

//   document.getElementById('photoUser').src = `${userCurrent.photoURL}`;

//   const userID = userCurrent.uid;
//   const nameUser = userCurrent.displayName;
//   console.log(nameUser);

//   const postDescription = document.getElementById('post-description');
//   document.querySelector('.publish').addEventListener('click', async () => {
//     savePost(postDescription, userID);
//     window.location.hash = '#/home';
//   });

//   document.querySelector('.addImg').addEventListener('click', () => {
//     document.querySelector('#input-file').click();
//   });

//   // const previewContainer = document.getElementById('container-image-preview');
//   const previewImg = document.querySelector('.image-preview');

//   document.querySelector('#input-file').addEventListener('change', function () {
//     const file = this.files[0];
//     console.log(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.addEventListener('load', function () {
//         previewImg.setAttribute('src', this.result);
//       });
//       reader.readAsDataURL(file);
//     } else {
//       previewImg.setAttribute('src', '');
//     }
//   });
// };
