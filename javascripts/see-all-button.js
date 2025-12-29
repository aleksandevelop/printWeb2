// Функция кнопки "Смотреть ВСЕ"
export function initSeeAllButton() {
  const seeAllBtn = document.querySelector('.see-all-btn');
  if (!seeAllBtn) return;
  
  let isExpanded = false;
  
  function getExtraItems() {
    return document.querySelectorAll('.works__list > .works__item:nth-child(n+13)');
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
        item.style.display = 'block';
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
}
