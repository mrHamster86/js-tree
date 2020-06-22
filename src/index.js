import TreeController from './controller/Tree';

const root = document.querySelector('#root');
const app = new TreeController(root);

root.appendChild(app.element);