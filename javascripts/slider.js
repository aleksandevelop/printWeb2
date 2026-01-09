// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM загружен, инициализируем Swiper...');
  
  // Проверяем, доступен ли элемент слайдера
  const swiperContainer = document.querySelector('.swiper-container');
  if (!swiperContainer) {
    console.error('Контейнер .swiper-container не найден!');
    return;
  }
  
  // Проверяем, доступен ли Swiper
  if (typeof Swiper === 'undefined') {
    console.error('Swiper не загружен!');
    return;
  }
  
  console.log('Swiper доступен, создаем слайдер...');
  
  let swiper1 = new Swiper('.swiper-container', {
    loop: true,  // Зацикливаем слайды
    
    autoplay: {
      delay: 3000,  // Задержка между слайдами (3 секунды)
      disableOnInteraction: false,  // Автоплей не остановится при взаимодействии
    },

    allowTouchMove: true, // Разрешаем свайпы пальцем
    speed: 500,  // Скорость анимации (быстро, но плавно)
    slidesPerView: 1,  // Показать только один слайд
    spaceBetween: 0,  // Без промежутков между слайдами
    
    // Простой fade эффект с crossFade для предотвращения наслоения
    effect: 'fade',
    fadeEffect: {
      crossFade: true  // Важно! Этот параметр предотвращает наслоение слайдов
    },
    
    // Навигационные элементы (стрелки)
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // Пагинация (точки)
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,  // Динамическое изменение размера активной точки
    },
    
    // Дополнительные настройки для плавности
    grabCursor: true,          // Курсор в виде руки при наведении
    keyboard: {
      enabled: true,           // Управление с клавиатуры
    },
    mousewheel: false,         // Отключаем прокрутку колесиком
    
    // Опции для лучшей производительности
    watchSlidesProgress: false,
    watchOverflow: true,
    
    // Плавное начало и конец анимации
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    
    // Предотвращение конфликтов
    resistance: false,
    edgeSwipeDetection: true,
    edgeSwipeThreshold: 20,
    
    // Улучшенный autoplay
    autoplayDisableOnInteraction: false,
    
    // Переход между слайдами
    slideToClickedSlide: false,
    
    // Настройки для адаптивности
    breakpoints: {
      // при 768px и выше
      768: {
        allowTouchMove: true
      }
    }
  });
  
  console.log('Swiper успешно инициализирован:', swiper1);
  
  // Дополнительно: пауза автоплея при наведении (опционально)
  swiperContainer.addEventListener('mouseenter', function() {
    swiper1.autoplay.stop();
    console.log('Автоплей приостановлен');
  });
  
  swiperContainer.addEventListener('mouseleave', function() {
    swiper1.autoplay.start();
    console.log('Автоплей возобновлен');
  });
});