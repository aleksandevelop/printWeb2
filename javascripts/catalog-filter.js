// Функция фильтрации каталога
import { updateSeeAllButtonForFilter } from './see-all-button.js';

// Глобальные переменные для отслеживания текущих фильтров
let currentMainFilter = 'all';
let currentSubFilter = null;

export function filterWorks(filterValue, isSubFilter = false) {
  const workItems = document.querySelectorAll('.works__item');
  const pechatContainer = document.querySelector('.pechat_container');
  
  // Обновляем текущие фильтры
  if (isSubFilter) {
    currentSubFilter = filterValue;
  } else {
    currentMainFilter = filterValue;
    currentSubFilter = null; // Сбрасываем подкатегорию при смене основного фильтра
    
    // Сбрасываем активную кнопку в подкатегориях
    const subFilterButtons = pechatContainer?.querySelectorAll('.filter-btn');
    subFilterButtons?.forEach(btn => btn.classList.remove('current'));
  }
  
  // Сначала скрываем все элементы с анимацией
  workItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
  });
  
  // Ждем завершения анимации скрытия
  setTimeout(() => {
    let visibleCount = 0;
    const maxVisible = 12; // Показываем первые 12 элементов (индекс 0-11 = 13 элементов)
    
    workItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const subcategory = item.getAttribute('data-subcategory');
      let shouldShow = false;
      
      if (currentMainFilter === 'all') {
        shouldShow = true;
      } else if (currentMainFilter === 'pechat' && currentSubFilter) {
        // Если выбраны печати и есть подкатегория
        shouldShow = category === 'pechat' && subcategory === currentSubFilter;
      } else if (category === currentMainFilter) {
        // Для основных категорий без подкатегории
        shouldShow = true;
      }
      
      if (shouldShow) {
        if (visibleCount < maxVisible) {
          // Показываем первые 13 элементов
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
          visibleCount++;
        } else {
          // Скрываем остальные элементы
          item.style.display = 'none';
          item.classList.add('hidden-item');
        }
      } else {
        // Скрываем элементы не подходящие под фильтр
        item.style.display = 'none';
        item.classList.add('hidden-item');
      }
    });
  }, 300);
  
  // Показываем/скрываем контейнер для печатей
  if (pechatContainer) {
    if (currentMainFilter === 'pechat') {
      pechatContainer.style.display = 'flex';
      setTimeout(() => {
        pechatContainer.style.opacity = '1';
        pechatContainer.style.transform = 'translateY(0)';
      }, 50);
    } else {
      pechatContainer.style.opacity = '0';
      pechatContainer.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        pechatContainer.style.display = 'none';
      }, 300);
    }
  }
  
  // Обновляем состояние кнопки "показать еще" после фильтрации
  setTimeout(() => {
    updateSeeAllButtonForFilter();
  }, 350);
}

export function initCatalogFilter() {
  const mainFilterButtons = document.querySelectorAll('.modGallery > .nav .filter-btn');
  const subFilterButtons = document.querySelectorAll('.pechat_container .filter-btn');
  
  // Обработчики для основных фильтров
  mainFilterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.classList.contains('current')) return;
      
      // Убираем активный класс со всех основных кнопок
      mainFilterButtons.forEach(btn => btn.classList.remove('current'));
      this.classList.add('current');
      
      const filterValue = this.getAttribute('data-filter');
      filterWorks(filterValue, false);
    });
  });
  
  // Обработчики для подкатегорий (фильтры печатей)
  subFilterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.classList.contains('current')) return;
      
      // Убираем активный класс со всех кнопок подкатегорий
      subFilterButtons.forEach(btn => btn.classList.remove('current'));
      this.classList.add('current');
      
      const filterValue = this.getAttribute('data-filter');
      filterWorks(filterValue, true);
    });
  });
  
  // Инициализация - показываем все элементы
  filterWorks('all', false);
}
