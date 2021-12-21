export const auth = {
  currentUser: {
    uid: 'fake-user-id',
  },
};
// export const setDoc = jest.fn((document, values) => Promise.resolve(values));
// export const doc = jest.fn((db, collection, docId) => Promise.resolve({}));
// export const db = {};

// eslint-disable-next-line max-len
export const signInWithEmailAndPassword = jest.fn((auth, email, password) => Promise.resolve({}));
