import { SignUp, Register } from './login-signUp/signup.js';
import { Login, initLogin } from './login-signUp/login.js';
import { Home, FunctionsHome } from './home.js';
import { resetPassword, resetPasswordInit } from './resetPassword.js';
import { Profile, FunctionProfile } from './profile.js';
import { navMobile } from './navegador/navMobile.js';
import { newPost, functionNewPost } from './newPost.js';
import { profileEdit, FunctionEdit } from './editProfile.js';
import { navLaptop } from './navegador/navLaptop.js';


export const components = {
  login: { Login, initLogin },
  signup: { SignUp, Register },
  home: { Home, FunctionsHome },
  resetPassword: { resetPassword, resetPasswordInit },
  profile: { Profile, FunctionProfile },
  navMobile: { navMobile },
  navLaptop: { navLaptop },
  newPost: { newPost, functionNewPost },
  edit: { profileEdit, FunctionEdit },
};
