// import {
//   userDocRef,
//   getUserDoc,
//   setUserDoc,
//   currentUser,
// } from '../firebase/firebase.js';

import {
  userDocRef,
  getUserDoc,
  setUserDoc,
} from '../firebase/firebase.js';

import { currentUser } from '../firebase/firebase-auth.js';

export const verificarUsuario = async function verificarSiExisteUsuario() {
  const userCurrent = currentUser().currentUser;
  const userID = userCurrent.uid;
  const nameUser = userCurrent.displayName;
  const docRef = userDocRef('usuarios', userID);
  const docSnap = await getUserDoc(docRef);

  if (docSnap.exists()) {
    console.log('existe');
  } else if (nameUser === null) {
    console.log(nameUser);
    await setUserDoc(docRef, {
      name: 'Developer',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcsPTHZ91k7dc7VsbRYTe7M5KHLtydC2M0iQUzNh2YG-C_6kBkroerXsVVW9c_CpYmVU&usqp=CAU',
      userUID: userID,
      about: 'Escribe una frase con la que te identifiques',
      portada: 'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
      career: 'Cuentanos a que te dedicas',
    });
  } else {
    await setUserDoc(docRef, {
      name: nameUser,
      photo: userCurrent.photoURL,
      userUID: userCurrent.uid,
      about: 'Escribe una frase con la que te identifiques',
      portada: 'https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg',
      career: 'Cuentanos a que te dedicas',
    });
    console.log('No existe');
  }
};
