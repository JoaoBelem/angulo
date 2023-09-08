const themeBtn = document.getElementById('themeBtn');

export default function doFloatingButtons() {
  let theme = localStorage.theme === 'true';

  if (theme) document.body.classList.add('dark');

  themeBtn.addEventListener('click', () => {
    theme = !theme;

    localStorage.theme = theme;
    document.body.classList.toggle('dark');
  });
}
