import { components } from "../view/index.js";

const changeView = (route) => {
  const container = document.getElementById("container");
  window.location.hash = route;
  container.innerHTML = "";

  switch (route) {
    case "":
    case "#/login":
    case "#/":
      container.appendChild(components.login.Login());
      components.login.initLogin();
      break;
    case "#/signup":
      container.appendChild(components.signup.SignUp());
        components.signup.Register();
      break;
    case "#/home":
      container.appendChild(components.home.Home()),
      components.home.LogOut();
      break;
  }
};

export { changeView };
