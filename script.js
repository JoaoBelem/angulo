let angulo = Math.floor(Math.random() * (330 - 30 + 1) + 30); //* ÂNGULO PARA PALPITE

function doCanvas() {
  const canvas = document.getElementById('display'); //* CANVAS
  const valorGrau = document.getElementById('valorGrau'); //* TEXTO GRAU

  //!
  const metadeTela = canvas.width / 2;
  const comprimentoPonteiro = metadeTela * 0.8; //* COMPRIMENTO PONTEIRO

  //* GERA NÚMEROS ALEATÓRIOS
  let grau = Math.floor(Math.random() * (180 - 0 + 1) + 0); //* GRAU DE ROTAÇÃO GERAL

  valorGrau.innerText = angulo + 'º';

  //&

  //? ANGULO PARA RADIANO
  function radian(angle) {
    return Math.PI * (angle / 180);
  }

  //* Desenho Canvas
  const ctx = canvas.getContext('2d');

  //? ponteiro centro
  const radianos = (grau * Math.PI) / 180 - Math.PI / 2;
  const xFinal = canvas.width / 2 + comprimentoPonteiro * Math.cos(radianos);
  const yFinal = canvas.height / 2 + comprimentoPonteiro * Math.sin(radianos);

  // ctx.strokeStyle = 'Red';
  // ctx.beginPath();
  // ctx.moveTo(150, 150);
  // ctx.lineTo(xFinal, yFinal);
  // ctx.stroke();

  //? ponteiro 1
  const radianos1 = ((grau + angulo / 2) * Math.PI) / 180 - Math.PI / 2;
  const xFinal1 = canvas.width / 2 + comprimentoPonteiro * Math.cos(radianos1);
  const yFinal1 = canvas.height / 2 + comprimentoPonteiro * Math.sin(radianos1);

  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(metadeTela, metadeTela);
  ctx.lineTo(xFinal1, yFinal1);
  ctx.stroke();

  //? ponteiro 2
  const radianos2 = ((grau - angulo / 2) * Math.PI) / 180 - Math.PI / 2;
  const xFinal2 = canvas.width / 2 + comprimentoPonteiro * Math.cos(radianos2);
  const yFinal2 = canvas.height / 2 + comprimentoPonteiro * Math.sin(radianos2);

  ctx.beginPath();
  ctx.moveTo(metadeTela, metadeTela);
  ctx.lineTo(xFinal2, yFinal2);
  ctx.stroke();

  //? Circulo
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.arc(
    metadeTela,
    metadeTela,
    metadeTela / 4,
    -Math.PI * 0.5 - radian(angulo / 2) + radian(grau),
    -Math.PI / 2 + radian(angulo / 2) + radian(grau)
  );
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.arc(metadeTela, metadeTela, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.stroke();
}

doCanvas();

function doForm() {
  let totalTentativas = 4;
  let tentativasFeitas = 0;

  //*
  const contadorTentativas = document.getElementById('contadorTentativas');
  const displayAjuda = document.getElementById('displayAjuda');
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
      form.querySelector('input').value = null;
      
      tentativasFeitas++;
      contadorTentativas.innerText = `${tentativasFeitas}/${totalTentativas}`;

      let moreOrLess = valor > angulo ? '▼' : '▲';

      let dica;

      if (valor < angulo) {
        if (angulo - valor <= 5) {
          dica = 'Fervendo!🔥';
        } else if (angulo - valor < 15) {
          dica = 'Quente!🥵';
        } else if (angulo - valor < 30) {
          dica = 'Esquentando!♨';
        } else if (angulo - valor < 50) {
          dica = 'Morno!';
        } else {
          dica = 'Frio!🥶';
        }
      } else {
        if (valor - angulo <= 5) {
          dica = 'Fervendo!🔥';
        } else if (valor - angulo < 15) {
          dica = 'Quente!🥵';
        } else if (valor - angulo < 30) {
          dica = 'Esquentando!♨';
        } else if (valor - angulo < 50) {
          dica = 'Morno!';
        } else {
          dica = 'Frio!🥶';
        }
      }

      console.log(moreOrLess);

      createHelp(valor + 'º', moreOrLess, dica);
    } else {
      console.log('Ganhou');
    }
  };
}

doForm();
