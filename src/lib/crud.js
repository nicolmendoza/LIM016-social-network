import {
  auth,
  setDoc,
  doc,
  db,
} from '../firebase.js';

export const saveAbout = async (About) => {
  const realDoc = await doc(db, 'usuarios', auth.currentUser.uid);
  return setDoc(realDoc, {
    about: About,
  });
};
