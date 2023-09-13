const themeBtn = document.getElementById('themeBtn');

export default function doFloatingButtons() {
  let theme = localStorage.theme === 'true';

  theme
    ? (themeBtn.innerText = 'Tema claro 🌞')
    : (themeBtn.innerText = 'Tema escuro 🌚');

  if (theme) document.body.classList.add('dark');

  themeBtn.addEventListener('click', () => {
    theme = !theme;

    localStorage.theme = theme;

    !!theme
      ? (themeBtn.innerText = 'Tema claro 🌞')
      : (themeBtn.innerText = 'Tema escuro 🌚');
    document.body.classList.toggle('dark');
  });
}
