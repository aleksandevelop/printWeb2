// Функция фильтрации каталога
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
    workItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filterValue === 'all') {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else if (category === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.display = 'none';
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
