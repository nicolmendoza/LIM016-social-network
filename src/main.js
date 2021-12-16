import { changeView } from './controller/routes.js';

window.addEventListener('load', changeView);

window.addEventListener('hashchange', changeView);
