import doCanvas from "./canvas.js";
import {clearHelper} from "./form.js";
import { closeWindow } from "./window.js";

export default function doScript() {
  const btn = document.querySelectorAll('.restartBtn');
  const form = document.forms.guess;
  const palpiteBtn = form.querySelector('button');

  btn.forEach(item => {
    item.addEventListener('click', () => {
      doCanvas();
      clearHelper();
      closeWindow();

      palpiteBtn.removeAttribute('disabled');
      form.reset();
    });
  })
}