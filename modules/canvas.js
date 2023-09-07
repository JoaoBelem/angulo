export let angulo;

export default function doCanvas() {
  angulo = Math.floor(Math.random() * (330 - 30 + 1) + 30); //* ÂNGULO PARA PALPITE

  //?
  const canvas = document.getElementById('display'); //* CANVAS
  // const valorGrau = document.getElementById('valorGrau'); //* TEXTO GRAU
  // valorGrau.innerText = angulo + 'º';

  //!
  const metadeTela = canvas.width / 2;
  const comprimentoPonteiro = metadeTela * 0.8; //* COMPRIMENTO PONTEIRO

  //* GERA NÚMEROS ALEATÓRIOS
  let grau = Math.floor(Math.random() * (180 - 0 + 1) + 0); //* GRAU DE ROTAÇÃO GERAL

  //&

  //? ANGULO PARA RADIANO
  function radian(angle) {
    return Math.PI * (angle / 180);
  }

  //* Desenho Canvas
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //? ponteiro centro
  const radianos = radian(grau) - Math.PI / 2;
  const xFinal = metadeTela + comprimentoPonteiro * Math.cos(radianos);
  const yFinal = metadeTela + comprimentoPonteiro * Math.sin(radianos);

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
