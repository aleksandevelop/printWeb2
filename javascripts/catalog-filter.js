// Функция фильтрации каталога
import { updateSeeAllButtonForFilter } from './see-all-button.js';

export function filterWorks(filterValue) {
  const workItems = document.querySelectorAll('.works__item');
  const pechatContainer = document.querySelector('.pechat_container');
  
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
      let shouldShow = false;
      
      if (filterValue === 'all') {
        shouldShow = true;
      } else if (category === filterValue) {
        shouldShow = true;
      }
      
      if (shouldShow) {
        if (visibleCount < maxVisible) {
          // Показываем первые 13 элементов
          item.style.display = 'block';
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
    if (filterValue === 'pechat') {
      pechatContainer.style.display = 'block';
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
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.classList.contains('current')) return;
      
      filterButtons.forEach(btn => btn.classList.remove('current'));
      this.classList.add('current');
      
      const filterValue = this.getAttribute('data-filter');
      filterWorks(filterValue);
    });
  });
  
  filterWorks('all');
}
