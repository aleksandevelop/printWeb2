// Главный файл - импортирует функции
import { initCatalogFilter } from './catalog-filter.js';
import { initSeeAllButton } from './see-all-button.js';
import { initInputMask } from './inputMask.js';

document.addEventListener("DOMContentLoaded", function() {
  initCatalogFilter();
  initSeeAllButton();
  initInputMask();
});
