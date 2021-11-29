import {SignUp, Register} from "./signup.js";
import {Login, initLogin} from "./login.js"
import {Home , LogOut} from "./home.js"

export const components={
    login:{Login,initLogin}, 
    signup:{SignUp, Register},
    home:{Home , LogOut}
}

