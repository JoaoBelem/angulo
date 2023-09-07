import { angulo } from './canvas.js';

const windowWin = document.querySelector('.windowWin');

const displayAjuda = document.getElementById('displayAjuda');
const contadorTentativas = document.getElementById('contadorTentativas');

let totalTentativas = 4;
let tentativasFeitas = 0;

export function clearHelper() {
  tentativasFeitas = 0;
  contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;
  displayAjuda.innerHTML = null;
}

export default function doForm() {
  clearHelper();
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
    if (!valor) {
      console.log('digite algo');
    } else if (valor != angulo) {
      if (tentativasFeitas + 1 == totalTentativas) {
        //* PERDEU
        console.log('perdeu');
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
        dica = 'Fervendo!🔥';
      } else if (a - b < 15) {
        dica = 'Quente!🥵';
      } else if (a - b < 30) {
        dica = 'Esquentando!♨';
      } else if (a - b < 50) {
        dica = 'Morno!';
      } else {
        dica = 'Frio!🥶';
      }

      createHelp(valor + 'º', moreOrLess, dica);
    } else {
      //* GANHOU
      tentativasFeitas++;
      contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;
      
      console.log('Ganhou');
      createHelp(valor + 'º', '😎', 'Ganhou!🎉');
      windowWin.parentElement.classList.add('show');
      form.querySelector('button').setAttribute('disabled', true);
    }
  };
}
