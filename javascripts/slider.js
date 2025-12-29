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
      delay: 2000,  // Увеличиваем задержку для 3D эффекта
      disableOnInteraction: false,  // Автоплей не остановится при взаимодействии
    },

    allowTouchMove: true, // Разрешаем свайпы пальцем
    speed: 1200,  // Средняя скорость для 3D анимации
    slidesPerView: 1,  // Показать только один слайд
    spaceBetween: 0,  // Без промежутков между слайдами
    effect: 'fade',  // 3D эффект куба
    
    // Параметры для cube эффекта
    cubeEffect: {
      slideShadows: true,      // Тени на гранях куба
      shadow: true,            // Тень под кубом
      shadowOffset: 20,        // Смещение тени
      shadowScale: 0.94        // Масштаб тени
    }
  });
  
  console.log('Swiper успешно инициализирован:', swiper1);
});