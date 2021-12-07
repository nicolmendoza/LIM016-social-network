import { SignUp, Register } from './signup.js';
import { Login, initLogin } from './login.js';
import { Home, FunctionsHome } from './home.js';
import { resetPassword, resetPasswordInit } from './resetPassword.js';
import { Profile, FunctionProfile } from './profile.js';
import { navMobile } from './navMobile.js';
//import { newPost, functionNewPost } from './newPost.js';

export const components = {
  login: { Login, initLogin },
  signup: { SignUp, Register },
  home: { Home, FunctionsHome },
  resetPassword: { resetPassword, resetPasswordInit },
  profile: { Profile, FunctionProfile },
  navMobile: { navMobile },
  //newPost: { newPost, functionNewPost },
};
