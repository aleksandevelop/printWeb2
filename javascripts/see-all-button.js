// Функция кнопки "Смотреть ВСЕ"
export function initSeeAllButton() {
  const seeAllBtn = document.querySelector('.see-all-btn');
  if (!seeAllBtn) return;
  
  let isExpanded = false;
  
  function getActiveFilter() {
    const activeBtn = document.querySelector('.filter-btn.current');
    return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  }
  
  function getExtraItems() {
    const activeFilter = getActiveFilter();
    const allItems = document.querySelectorAll('.works__list > .works__item');
    const extraItems = [];
    let visibleCount = 0;
    const maxVisible = 12; // Показываем первые 12 элементов (индекс 0-11 = 13 элементов)
    
    allItems.forEach((item, index) => {
      const category = item.getAttribute('data-category');
      let shouldShow = false;
      
      if (activeFilter === 'all') {
        shouldShow = true;
      } else if (category === activeFilter) {
        shouldShow = true;
      }
      
      if (shouldShow) {
        if (visibleCount >= maxVisible) {
          // Это элементы после 13-го для текущего фильтра
          extraItems.push(item);
        }
        visibleCount++;
      }
    });
    
    return extraItems;
  }
  
  function updateSeeAllButton() {
    const extraItems = getExtraItems();
    const hasHiddenItems = extraItems.some(item => 
      item.classList.contains('hidden-item') || item.style.display === 'none'
    );
    
    if (extraItems.length === 0) {
      seeAllBtn.style.display = 'none';
    } else {
      seeAllBtn.style.display = 'flex';
      if (isExpanded && hasHiddenItems) {
        isExpanded = false;
        seeAllBtn.textContent = 'Смотреть ВСЕ';
      }
    }
  }
  
  function hideExtraItems() {
    const extraItems = getExtraItems();
    extraItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
      setTimeout(() => {
        item.classList.add('hidden-item');
        item.style.display = 'none';
      }, 300);
    });
  }
  
  seeAllBtn.addEventListener('click', function() {
    const extraItems = getExtraItems();
    
    if (!isExpanded) {
      extraItems.forEach((item, index) => {
        item.classList.remove('hidden-item');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.display = 'flex';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, index * 50);
      });
      this.textContent = 'Скрыть';
      isExpanded = true;
    } else {
      hideExtraItems();
      this.textContent = 'Смотреть ВСЕ';
      isExpanded = false;
    }
  });
  
  hideExtraItems();
  updateSeeAllButton();
}

// Экспортируем функцию обновления для использования в catalog-filter.js
export function updateSeeAllButtonForFilter() {
  const seeAllBtn = document.querySelector('.see-all-btn');
  if (!seeAllBtn) return;
  
  const activeFilter = document.querySelector('.filter-btn.current')?.getAttribute('data-filter') || 'all';
  const allItems = document.querySelectorAll('.works__list > .works__item');
  const extraItems = [];
  let visibleCount = 0;
  const maxVisible = 12; // Показываем первые 12 элементов (индекс 0-11 = 13 элементов)
  
  allItems.forEach((item, index) => {
    const category = item.getAttribute('data-category');
    let shouldShow = false;
    
    if (activeFilter === 'all') {
      shouldShow = true;
    } else if (category === activeFilter) {
      shouldShow = true;
    }
    
    if (shouldShow) {
      if (visibleCount >= maxVisible) {
        // Это элементы после 13-го для текущего фильтра
        extraItems.push(item);
      }
      visibleCount++;
    }
  });
  
  if (extraItems.length === 0) {
    seeAllBtn.style.display = 'none';
  } else {
    seeAllBtn.style.display = 'block';
    seeAllBtn.textContent = 'Смотреть ВСЕ';
  }
}
