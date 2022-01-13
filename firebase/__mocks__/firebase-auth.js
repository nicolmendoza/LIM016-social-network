const auth = {
  currentUser: {
    uid: 'fake-user-id',
  },
};

const resetPasswordFirebase = jest.fn(() => Promise.resolve());

const createUser = jest.fn(() => new Promise((resolve, reject) => {
  resolve({
    userCredential: {
      user: {
        emailVerified: true,
      },
    },
  });
  reject(window.alert = jest.fn());
}));

const verificationEmail = jest.fn(() => Promise.resolve({
  userCredential: {
    user: {
      emailVerified: true,
    },
  },
}));

export const loginEmail = jest.fn(() => Promise.resolve({
  user: {
    emailVerified: true,
  },
}));

export {
  auth,
  resetPasswordFirebase,
  createUser,
  verificationEmail,
};
