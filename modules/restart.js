import doCanvas from './canvas.js';
import { clearHelper } from './form.js';
import { closeWindow } from './window.js';

const btn = document.querySelectorAll('.restartBtn');
const form = document.forms.guess;
const palpiteBtn = form.querySelector('button');

export function restart() {
  doCanvas();
  closeWindow();
  
  palpiteBtn.removeAttribute('disabled');
  form.reset();
  clearHelper();
}

export default function doScript() {
  btn.forEach((item) => {
    item.addEventListener('click', restart);
  });
}
