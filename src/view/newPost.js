import {
  getAuth,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

import {
  doc,
  getFirestore,
  onSnapshot,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

import {
  currentUser, savePost, storageRef,
  uploadTask,
  getPhotoURL,
} from '../firebase.js';

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
            <div id='namePost'></div>
            <select class="privacity">
                <option value="amigos"><i class="fas fa-bell"></i>Amigos
                <option value="solo yo"><i class="fas fa-bell"></i>Solo yo
            </select>
        </div>
    </div>

    <textarea namePost="textarea" id="post-description" rows="10" cols="50" placeholder="What's on you mind?"></textarea>
    <div id="container-image-preview">
      <img src="" class="image-preview" alt=""/>
    </div>
    <div class="add-element">
    <div class="plus-image"><b>+</b></div>
      <div class="addImage">
        <button class= "addImg"><ion-icon name="image-outline"></ion-icon></ion-icon></button>
        <input type="file" id="input-file" style="display:none" multiple/>
        <button class= "add camara"><ion-icon name="camera-outline"></ion-icon></button>
        <button class= "add video"><ion-icon name="videocam-outline"></ion-icon></button>
        <button class= "add archive"><ion-icon name="attach-outline"></ion-icon></button>
      </div>
    </div>
    `;

  return document.querySelector('.modalContainer-NewPost').appendChild(newPostContainer);
};

export const functionNewPost = () => {
  const userCurrent = currentUser().currentUser;
  // autentificando usuario logueado
  const auth = getAuth();
  const user = auth.currentUser;
  // const userCurrent = currentUser().currentUser;
  const db = getFirestore();

  (async () => {
    onSnapshot(doc(db, 'usuarios', user.uid), (docUser) => {
      document.getElementById('photoUser').src = docUser.data().photo;
      const info2 = document.getElementById('namePost');
      info2.innerHTML = docUser.data().name;
    });
  })();

  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;
  console.log(nameUser);

  const photoFile = document.querySelector('#input-file');

  document.querySelector('.addImg').addEventListener('click', () => {
    photoFile.click();
  });

  // const previewContainer = document.getElementById('container-image-preview');
  const previewImg = document.querySelector('.image-preview');
  let files = [];
  const reader = new FileReader();

  photoFile.onchange = (e) => {
    files = e.target.files;
    // const extention = GetFileExt(files[0]);
    // const name = GetFileName(files[0]);

    reader.readAsDataURL(files[0]);
    // uploadImg(files);
  };
  reader.onload = function () {
    previewImg.src = reader.result;
  };

  // document.querySelector('#input-file').addEventListener('change', function () {
  //   const file = this.files[0];
  //   console.log(file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', function () {
  //       previewImg.setAttribute('src', this.result);
  //     });
  //     reader.readAsDataURL(file);
  //     async () => {
  //       uploadImg(file);
  //     };
  //   } else {
  //     previewImg.setAttribute('src', '');
  //   }
  // });

  const postDescription = document.getElementById('post-description');
  document.querySelector('.publish').addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    if ((postDescription.value !== '' && photoFile.files[0]) || (postDescription.value === '' && photoFile.files[0])) {
      const imgUpload = files[0];
      const metadata = { content: imgUpload.type };
      console.log(imgUpload);

      const storageRef1 = storageRef(imgUpload);
      const task = uploadTask(storageRef1, imgUpload, metadata);

      task.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('holi');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      (() => {
        // eslint-disable-next-line max-len
        getPhotoURL(task.snapshot.ref).then((downloadURL) => {
          savePost(postDescription, userID, downloadURL);
          console.log(downloadURL);
          document.querySelector('.modalNewPost').style.display = 'none';
        });
      }));
    } else if (postDescription.value !== '' && !photoFile.files[0]) {
      savePost(postDescription, userID, '');
      document.querySelector('.modalNewPost').style.display = 'none';
    } else {
      alert('su post esta vacio');
    }

    // savePost(postDescription, userID);
    // window.location.hash = '#/home';
  });

  document.querySelector('.descart').addEventListener('click', () => {
    document.querySelector('.modalNewPost').style.display = 'none';
  });
};
