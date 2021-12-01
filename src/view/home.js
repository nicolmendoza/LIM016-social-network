// eslint-disable-next-line import/no-unresolved
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import {
  getFirestore, doc, setDoc, collection, getDocs,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

export const Home = () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = ` 
  <div>WELCOME</div>
  <img id="photoUser" width="100px">
  <div id="infoUser"></div>
  <button id="logout">Log Out</button>

  <input type="text" id="about"  placeholder="about" >
  <button id="click">click</button>
  <p id="aboutP"></p>`;
  return document.getElementById('container').appendChild(divElement);
};

export const LogOut = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log(user);
    if (user.displayName == null) {
      const info = document.getElementById('infoUser');

      info.innerHTML = 'Bienvenida Developer';
    } else {
      const info = document.getElementById('infoUser');

      info.innerHTML = `Bienvenida ${user.displayName}`;
    }
    document.getElementById('photoUser').src = `${user.photoURL}`;
  } else {
  // No user is signed in.
  }

  document.querySelector('#logout').addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('log out');
        window.location.hash = '#/';
        // window.location.reload();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });

  console.log(user.uid);

  async function mostarAbout() {
    const db = getFirestore();
    const Snapshot = await getDocs(collection(db, 'usuarios'));

    Snapshot.forEach((docAbout) => {
      if (docAbout.id === user.uid) {
        document.getElementById('aboutP').innerHTML = `About : ${docAbout.data().about}`;
        console.log(docAbout.id, ' => ', docAbout.data());
      }
    });
    // await onSnapshot(doc(db, 'usuarios', user.uid), (docAbout) => {
    //   document.getElementById('aboutP').innerHTML = ' ';
    //   document.getElementById('aboutP').innerHTML = `About : ${docAbout.data().about}`;
    //   console.log('Current data: ', docAbout.data());
    // });
  }
  mostarAbout();

  document.getElementById('click').addEventListener('click', async () => {
    // guardar documentos
    const db = getFirestore();
    const About = document.getElementById('about').value;
    // Add a new document in collection "cities"
    await setDoc(doc(db, 'usuarios', user.uid), {
      about: About,
    });
    // leer documentos
    mostarAbout();
  });
};
