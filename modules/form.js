import { angulo } from './canvas.js';

const windowWin = document.getElementById('windowWin');
const windowLose = document.getElementById('windowLose');

const displayAjuda = document.getElementById('displayAjuda');
const contadorTentativas = document.getElementById('contadorTentativas');

let totalTentativas;

let data;
if (localStorage.config) {
  data = JSON.parse(localStorage.config);
}

data ? (totalTentativas = +data.tries) : (totalTentativas = 4);

let tentativasFeitas = 0;

export function clearHelper() {
  if (localStorage.config) {
    data = JSON.parse(localStorage.config);
  }

  tentativasFeitas = 0;

  if (data && data.tries) {
    totalTentativas = +data.tries;
  } else {
    totalTentativas = 4;
  }

  contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;
  displayAjuda.innerHTML = null;
}

export default function doForm() {
  clearHelper();
  totalTentativas = 4;
  //*
  const form = document.forms.guess;

  function createHelp(grau, seta, dica) {
    const helper = document.createElement('div');
    helper.classList.add('helpChild');

    const grauDiv = document.createElement('div');
    grauDiv.innerText = grau;

    const setaDiv = document.createElement('div');
    setaDiv.innerText = seta;

    const dicaDiv = document.createElement('div');
    dicaDiv.innerText = dica;

    [grauDiv, setaDiv, dicaDiv].forEach((item) => {
      helper.appendChild(item);
    });

    displayAjuda.appendChild(helper);
  }
  //!
  contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;

  form.onsubmit = (e) => {
    e.preventDefault();
    const valor = form.querySelector('input').value;
    if (valor !== '' && valor != angulo) {
      if (tentativasFeitas + 1 == totalTentativas) {
        //! PERDEU
        windowLose.querySelector('.valor').innerText = angulo + 'º';
        windowLose.parentElement.classList.add('show');
        form.querySelector('button').setAttribute('disabled', true);
      }
      form.querySelector('input').value = null;

      tentativasFeitas++;
      contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;

      let moreOrLess = valor > angulo ? '▼' : '▲';

      let dica;

      let a, b;
      if (valor < angulo) {
        a = angulo;
        b = valor;
      } else {
        a = valor;
        b = angulo;
      }

      if (a - b <= 5) {
        dica = 'Fervendo! 🔥';
      } else if (a - b < 15) {
        dica = 'Quente! 🥵';
      } else if (a - b < 30) {
        dica = 'Esquentando! 🌭';
      } else if (a - b < 50) {
        dica = 'Meio termo! 👽';
      } else if (a - b < 100) {
        dica = 'Frio! 🧊';
      } else {
        dica = 'Congelando! 🥶';
      }

      createHelp(valor + 'º', moreOrLess, dica);
    } else if (valor !== '') {
      //* GANHOU
      tentativasFeitas++;
      contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;

      windowWin.querySelector('.valor').innerText = angulo + 'º';

      createHelp(valor + 'º', '😎', 'Ganhou!🎉');
      windowWin.parentElement.classList.add('show');
      form.querySelector('button').setAttribute('disabled', true);
    }
  };
}
