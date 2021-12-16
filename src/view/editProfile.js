import {
  storagePhotoProf,
  uploadTask,
  getPhotoURL,
} from '../firebase/firebase-storage.js';

// import {
//   obtenerInfo, updateInfoUser,
// } from '../firebase/firebase.js';

import {
  obtenerInfo, updateInfoUser,
} from '../firebase/firestore.js';

import { currentUser } from '../firebase/firebase-auth.js';

export const profileEdit = () => {
  const EditProfile = document.createElement('div');
  EditProfile.innerHTML = `
    <div>Edit Profile</div>
    <img id="photoUserEdit" width="100px">
    <input type="file" id="edit-file" multiple/>
    <img id="portadaUserEdit" width="100px">
    <input type="file" id="edit-portada" multiple/>
    <p>Edita tu Nombre</p>
    <input type="text" id="edit-name"  placeholder="Name" >
    <p>Edita tu Ocupación</p>
    <input type="text" id="edit-career"  placeholder="Ocupation" >
    <p>Edita tu about</p>
    <input type="text" id="edit-about"  placeholder="About" >
    <button id="btn-edit">Save</button>`;
  document.getElementById('container').innerHTML = '';
  return document.getElementById('container').appendChild(EditProfile);
};

export const FunctionEdit = () => {
  const user = currentUser().currentUser;

  const newName = document.getElementById('edit-name');
  const newAbout = document.getElementById('edit-about');
  const newPhoto = document.getElementById('photoUserEdit');
  const newPortada = document.getElementById('portadaUserEdit');
  const newCareer = document.getElementById('edit-career');

  (() => {
    obtenerInfo(user.uid).then((userInfo) => {
      console.log(userInfo);
      newPhoto.src = `${userInfo.data().photo}`;
      newPortada.src = `${userInfo.data().portada}`;
      newName.value = `${userInfo.data().name}`;
      newAbout.value = `${userInfo.data().about}`;
      newCareer.value = `${userInfo.data().career}`;
    });
  })();

  // SUBIENDO NUEVA FOTO DE PERFIL
  // window.addEventListener('click', (e) => {
  //   const fileEdit = e.target;
  //   console.log(fileEdit);
  //   let files = [];
  //   const readerEdit = new FileReader();

  //   fileEdit.onchange = (a) => {
  //     files = a.target.files;
  //     readerEdit.readAsDataURL(files[0]);
  //     console.log(readerEdit);
  //     console.log(readerEdit.result);
  //   // uploadImg(files);
  //   };
  //   readerEdit.onload = function () {
  //     if (fileEdit.id === 'edit-file') {
  //       console.log(readerEdit);
  //       newPhoto.src = readerEdit.result;
  //     } else if (fileEdit.id === 'edit-portada') {
  //       console.log(readerEdit);
  //       newPortada.src = readerEdit.result;
  //     }
  //   };

  //   document.getElementById('btn-edit').addEventListener('click', (e) => {
  //     e.preventDefault();
  //     // eslint-disable-next-line max-len
  //     if (fileEdit.files[0]) {
  //       const imgUpload = files[0];
  //       const metadata = { content: imgUpload.type };
  //       console.log(imgUpload);

  //       const storageRef1 = storagePhotoProf(imgUpload);
  //       const task = uploadTask(storageRef1, imgUpload, metadata);

  //       task.on('state_changed', (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log(`Upload is ${progress}% done`);
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //           default:
  //             console.log('holi');
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       (() => {
  //         // eslint-disable-next-line max-len
  //         getPhotoURL(task.snapshot.ref).then((downloadURL) => {
  //           // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //           updateInfoUser(user.uid, newAbout.value, newName.value, downloadURL, newPortada.src, newCareer.value);
  //           window.location.hash = '#/profile';
  //         });
  //       }));
  //     } else {
  //       // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //       updateInfoUser(user.uid, newAbout.value, newName.value, newPhoto.src, newPortada.src, newCareer.value);
  //       window.location.hash = '#/profile';
  //     }
  //   });
  // });

  //   document.getElementById('btn-edit').addEventListener('click', () => {
  //     // eslint-disable-next-line max-len
  //     if (fileEdit.files[0]) {
  //       const imgUpload = files[0];
  //       console.log(imgUpload)
  //       const metadata = { content: imgUpload.type };
  //       console.log(imgUpload);

  //       const storageRef1 = storagePhotoProf(imgUpload);
  //       const task = uploadTask(storageRef1, imgUpload, metadata);

  //       task.on('state_changed', (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log(`Upload is ${progress}% done`);
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //           default:
  //             console.log('holi');
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       (() => {
  //         // eslint-disable-next-line max-len
  //         getPhotoURL(task.snapshot.ref).then((downloadURL) => {
  //           updateInfoUser(user.uid, newAbout.value, newName.value, downloadURL, newPortada.src);
  //           window.location.hash = '#/profile';
  //         });
  //       }));
  //     } else {
  //       updateInfoUser(user.uid, newAbout.value, newName.value, newPhoto.src, newPortada.src);
  //       window.location.hash = '#/home';
  //     }
  //   });
  // });

  // GUARDANDO NUEVA INFORMACION

  const fileEdit = document.getElementById('edit-file');
  let files = [];
  const readerEdit = new FileReader();

  fileEdit.onchange = (e) => {
    files = e.target.files;
    // const extention = GetFileExt(files[0]);
    // const name = GetFileName(files[0]);

    readerEdit.readAsDataURL(files[0]);
    // uploadImg(files);
  };
  readerEdit.onload = function () {
    console.log(readerEdit);
    newPhoto.src = readerEdit.result;
  };

  // GUARDANDO NUEVA INFORMACION

  document.getElementById('btn-edit').addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    if (fileEdit.files[0]) {
      const imgUpload = files[0];
      const metadata = { content: imgUpload.type };
      console.log(imgUpload);

      const storageRef1 = storagePhotoProf(imgUpload);
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
        // eslint-disable-next-line max-len
          updateInfoUser(user.uid, newAbout.value, newName.value, downloadURL, newPortada.src, newCareer.value);
          window.location.hash = '#/profile';
        });
      }));
    } else {
    // eslint-disable-next-line max-len
      updateInfoUser(user.uid, newAbout.value, newName.value, newPhoto.src, newPortada.src, newCareer.value);
      window.location.hash = '#/profile';
    }
  });
};
