const auth = {
  currentUser: {
    uid: 'fake-user-id',
  },
};

const resetPasswordFirebase = jest.fn(() => Promise.resolve());

export const loginEmail = jest.fn(() => Promise.resolve(
  {
    userCredential: {
      user: {
        emailVerified: true,
      },
    },
  },
));
export {
  auth,
  resetPasswordFirebase,
  // signInWithEmailAndPassword,
};
