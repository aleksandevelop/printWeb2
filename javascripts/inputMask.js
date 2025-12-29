
const rootSelector = '[data-js-input-mask]'

// Функция для масок ввода
export function initInputMask() {
  const isLibReady = typeof window.IMask !== 'undefined';

  if (!isLibReady) {
    console.error('Библиотека "imask" не подключена!');
    return;
  }

  document.querySelectorAll('[data-js-input-mask]').forEach(element => {
    window.IMask(element, {
      mask: element.dataset.jsInputMask
    });
  });
}
