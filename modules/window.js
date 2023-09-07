const windows = document.querySelectorAll('.window');

export function closeWindow() {
  windows.forEach((item) => {
    item.classList.remove('show');
  });
}

export default function doWindow() {
  windows.forEach((item) => {
    const closeBtn = item.querySelector('.close');
    closeBtn.addEventListener('click', closeWindow);
  });
}
