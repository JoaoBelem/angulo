import { restart } from './restart.js';

const windows = document.querySelectorAll('.window');

export function closeWindow() {
  windows.forEach((item) => {
    item.classList.remove('show');
  });
}

export default function doWindow() {
  const closeBtn = document.querySelectorAll('.close');
  closeBtn.forEach((item) => {
    item.addEventListener('click', closeWindow);
  });

  //* WINDOW CONFIGURAÇÕES
  const windowConfig = document.getElementById('windowConfig');
  const formConfig = windowConfig.querySelector('form');

  document.getElementById('configBtn').addEventListener('click', () => {
    windowConfig.parentElement.classList.add('show');
  });

  const submitConfigs = windowConfig.querySelector('button[type="submit"]');

  submitConfigs.addEventListener('click', (e) => {
    e.preventDefault();

    const configValores = Array.from(formConfig.elements)
      .filter((item) => {
        if (item.tagName === 'INPUT' && item.value !== '') return true;
      })
      .reduce((acumulador, item) => {
        return { ...acumulador, [item.name]: item.value };
      }, null);

    if (configValores !== null) localStorage['config'] = JSON.stringify(configValores);
    windowConfig.parentElement.classList.remove('show');
    restart();
  });
}
