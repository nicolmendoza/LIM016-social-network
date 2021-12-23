const auth = {
  currentUser: {
    uid: 'fake-user-id',
  },
};

const resetPasswordFirebase = jest.fn(() => Promise.resolve({}));

// export const loginEmail = jest.fn(() => Promise.resolve({
//   user: {
//     emailVerified: true,
//   },
// }));
// export const loginGoogle = () => Promise.resolve();
// export const loginFacebook = () => Promise.resolve();
// export const loginGitHub = () => Promise.resolve();
// export const currentUser = () => ({
//   currentUser: {
//     uid: '',
//     displayName: '',
//   },
// });

export {
  auth,
  resetPasswordFirebase,
};
