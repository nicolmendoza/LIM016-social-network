export const loginEmail = jest.fn(() => Promise.resolve({
  user: {
    emailVerified: true,
  },
}));
export const loginGoogle = () => Promise.resolve();
export const loginFacebook = () => Promise.resolve();
export const loginGitHub = () => Promise.resolve();
export const currentUser = () => ({
  currentUser: {
    uid: '',
    displayName: '',
  },
});
