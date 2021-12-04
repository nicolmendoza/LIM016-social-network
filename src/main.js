import { changeView } from './controller/routes.js';

window.addEventListener('load', () => {
  changeView(window.location.hash);
});

window.addEventListener('hashchange', () => {
  changeView(window.location.hash);
});
