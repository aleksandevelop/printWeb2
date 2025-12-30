

// Код для счетчика количества
const min = document.querySelector('.min');
const plus = document.querySelector('.plus');
const res = document.querySelector('.res');
const total = document.querySelector(".total");

min.addEventListener('click', function () {
  if (Number(res.innerText) === 0) {
    return;
  }
  res.innerText = Number(res.innerText) - 1;
  const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
  total.textContent = newTotal + " рублей";
});

plus.addEventListener('click', function () {
  res.innerText = Number(res.innerText) + 1;
  const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
  total.textContent = newTotal + " рублей";
});

// Глобальные переменные для цен
let sealPrice = 0;
let deliverPrice = 0;
let preparationFee = 0;
let layoutPrice = 0;

// Telegram API настройки
const TOKEN = '8542757312:AAFYeJvaPyZ2lzvAIS3q3CIbE_XLaIFlTOs';
const CHAT_ID = '-1003429644025';
const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// Элементы формы
const uslugaInput = document.querySelector('#dropdown-input');
const invalidEl = document.querySelector('.invalid.invalid1');
const formButton = document.querySelector('#openModalBtn');
const invalidEl2 = document.querySelector('.invalid.invalid2');
const deliveryDate = document.querySelector('.delivery_type-date');
const invalidEl3 = document.querySelector('.invalid.invalid3');
const deliveryType = document.querySelector('.delivery_type-delivery');
const invalidEl4 = document.querySelector('.invalid.invalid4');
const markType = document.querySelector('#openBtn1');
const invalidEl5 = document.querySelector('.invalid.invalid5');
const comment = document.querySelector('#order__textarea');
const openBtn = document.querySelector(".popup_btn");
const popup = document.querySelector("dialog");
const orderBtn = document.querySelector("div.price.total");

// Функция валидации
function validateUsluga() {
  // Получаем все значения
  const isEmpty1 = !uslugaInput.value || uslugaInput.value === 'Выбрать услугу';
  const isEmpty2 = !formButton.textContent || formButton.textContent === 'Сделать выбор';
  const isEmpty3 = !deliveryDate.value || deliveryDate.value === 'Сделать выбор';
  const isEmpty4 = !deliveryType.value || deliveryType.value === 'Сделать выбор';
  const isEmpty5 = !markType.textContent || markType.textContent === 'Выбрать оснастку';
  
  // Проверяем, что элементы существуют
  if (invalidEl) {
    invalidEl.style.display = isEmpty1 ? 'block' : 'none';
  }
  if (invalidEl2) {
    invalidEl2.style.display = isEmpty2 ? 'block' : 'none';
  }
  if (invalidEl3) {
    invalidEl3.style.display = isEmpty3 ? 'block' : 'none';
  }
  if (invalidEl4) {
    invalidEl4.style.display = isEmpty4 ? 'block' : 'none';
  }
  if (invalidEl5) {
    invalidEl5.style.display = isEmpty5 ? 'block' : 'none';
  }

  // Находим кнопку отправки
  const submitBtn = document.querySelector('[type="submit"]');

  // Если кнопка существует
  if (submitBtn) {
    // Блокируем если ЛЮБОЕ поле пустое
    const anyFieldEmpty = isEmpty1 || isEmpty2 || isEmpty3 || isEmpty4 || isEmpty5;
    submitBtn.disabled = anyFieldEmpty;
  }

  // Возвращаем true если ВСЕ поля заполнены
  const allFieldsFilled = !isEmpty1 && !isEmpty2 && !isEmpty3 && !isEmpty4 && !isEmpty5;
  return allFieldsFilled; // true = можно отправлять
}

// Обработка отправки формы
document.querySelector(".order-form").addEventListener('submit', function (e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;
  let n = 0; // номер заказа
  
  // Блокируем кнопку
  submitBtn.disabled = true;

  if (!validateUsluga()) {
    submitBtn.disabled = false;
    return;
  }
  n += 1;

  const message = `
🔔‌Заказ № ${n}🔔

<b>№ ${n} </b>
${new Date()}

Заказ от <b>${document.querySelector("#name").value.trim()}</b>:

<b>Покупатель:</b> ${document.querySelector("#name").value.trim()}
<b>Телефон:</b> ${document.querySelector("#phone").value.trim()}
<b>Услуга:</b> ${uslugaInput.value}
<b>Макет:</b> ${formButton.textContent}
<b>Остнаска:</b> ${markType.textContent}
<b>Количество:</b> ${res.innerText.trim() || 'Не указано'}

<b>Изготовление:</b> ${deliveryDate.value.trim() || 'Не выбрано'}
<b>Доставка:</b> ${deliveryType.value.trim() || 'Не выбрано'}

<b>Комментарий:</b> ${comment.value || 'Не оставлено'}

-------------------------------
<b>Итого</b>: ${total.textContent.trim()}

<b>Поздравляем вас с продажей!</b>`;

  axios.post(url, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
    .then((res) => {
      alert('Заказ оформлен, с вами свяжемся!');
      
      // Полный сброс формы
      const form = document.querySelector(".order-form");
      form.reset();
      
      // Сброс полей которые не сбрасываются через reset()
      document.querySelector("#name").value = '';
      document.querySelector("#phone").value = '';
      uslugaInput.value = '';
      formButton.textContent = 'Сделать выбор';
      markType.textContent = 'Выбрать оснастку';
      document.querySelector('.res').innerText = '1';
      
      // Сброс цен
      sealPrice = 0;
      layoutPrice = 0;
      deliverPrice = 0;
      preparationFee = 0;
      total.textContent = '0 рублей';
      
      // Сброс изображений
      document.querySelector(".seal-layout").src = "images/plhold.jpg";
      document.querySelector(".seal-img-target").src = "images/plhold.jpg";
      document.querySelector(".seal-layout").classList.add("hidden");
      document.querySelector(".seal-img-target").classList.add("hidden");
      
      // Сброс текстовых элементов
      document.querySelector(".order_img_one-text").textContent = '';
      document.querySelector(".seal-title").textContent = '';
      document.querySelector(".price-title1").textContent = '';
      document.querySelector(".price-title2").textContent = '';
      document.querySelectorAll(".order_img_one-title").forEach(title => {
        title.textContent = '';
      });
      
      // Скрыть все сообщения об ошибках
      document.querySelectorAll('.invalid').forEach(el => {
        el.style.display = 'none';
      });
      
      // Разблокировать кнопку отправки
      const submitBtn = document.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    })
    .catch((err) => {
      console.error('Ошибка:', err);
      alert('Ошибка отправки. Попробуйте позже.');
    })
    .finally(() => {
      // Разблокируем кнопку в любом случае
      const submitBtn = document.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '0 рублей';
      }
    });
});

// Массивы с данными о печатях и макетах
const seals = [
  {
    href: "images/seals/1.png",
    price: 550,
    name: "Без остнастки"
  },
  {
    href: "images/seals/2.png",
    price: 550,
    name: "Trodat (автомат)",
    titleName: "автоматическая",
    sealName: "Trodat"
  },
  {
    href: "images/seals/3.png",
    price: 650,
    name: "Ideal (полу-автомат)",
    titleName: "полу автоматическая",
    sealName: "Ideal"
  },
  {
    href: "images/seals/4.png",
    price: 1300,
    name: "Ракета (полу-автомат)",
    titleName: "полу автоматическая",
    sealName: "Ракета"
  },
  {
    href: "images/seals/5.png",
    price: 300,
    name: "Акрил (простая)",
    titleName: "простая",
    sealName: "Акрил"
  },
  {
    href: "images/seals/6.png",
    price: 200,
    name: "Пешка (простая)",
    titleName: "простая",
    sealName: "Пешка"
  },
  {
    href: "images/seals/7.png",
    price: 300,
    name: "Таблетка (простая)",
    titleName: "простая",
    sealName: "Таблетка"
  },
  {
    href: "images/seals/8.png",
    price: 200,
    name: "Пешка-2 (простая)",
    titleName: "простая",
    sealName: "Пешка-2"
  },
  {
    href: "images/seals/9.png",
    price: 2200,
    name: "Пешка-3 (простая)",
    titleName: "простая",
    sealName: "Пешка-3"
  },
  {
    href: "images/seals/10.png",
    price: 1900,
    name: "Пешка-4 (простая)",
    titleName: "простая",
    sealName: "Пешка-4"
  },
  {
    href: "images/seals/11.png",
    price: 2100,
    name: "НЛО (карманная)",
    titleName: "карманная",
    sealName: "НЛО"
  },
  {
    href: "images/seals/12.png",
    price: 2100,
    name: "Таблетка-2 (карманная)",
    titleName: "карманная",
    sealName: "Таблетка"
  },
  {
    href: "images/seals/13.png",
    price: 2900,
    name: "Диско-кейс (карманная)",
    titleName: "карманная",
    sealName: "Диско-кейс"
  },
  {
    href: "images/seals/14.png",
    price: 3000,
    name: "Диско (карманная)",
    titleName: "карманная",
    sealName: "Диско"
  },
  {
    href: "images/seals/15.png",
    price: 3000,
    name: "Магнет (карманная)",
    titleName: "карманная",
    sealName: "Магнет"
  },
  {
    href: "images/seals/16.png",
    price: 1800,
    name: "Евро (металл)",
    titleName: "металлическая",
    sealName: "Евро"
  },
  {
    href: "images/seals/17.png",
    price: 2200,
    name: "Евро-2 (металл)",
    titleName: "металлическая",
    sealName: "Евро-2"
  },
  {
    href: "images/seals/18.png",
    price: 2200,
    name: "Евро-3 (металл)",
    titleName: "металлическая",
    sealName: "Евро-3"
  },
  {
    href: "images/seals/19.png",
    price: 2000,
    name: "Евро-4 (металл)",
    titleName: "металлическая",
    sealName: "Евро-4"
  },
  {
    href: "images/seals/20.png",
    price: 2200,
    name: "Евро-5 (металл)",
    titleName: "металлическая",
    sealName: "Евро-5"
  }
];

// Define arrays for doctors and companies
const doctorsArray = [
  { name: 'ВР-01', img: 'images/doctors/ВР1.svg' },
  { name: 'ВР-02', img: 'images/doctors/ВР2.svg' },
  { name: 'ВР-03', img: 'images/doctors/ВР3.svg' },
  { name: 'ВР-04', img: 'images/doctors/ВР4.svg' },
  { name: 'ВР-05', img: 'images/doctors/ВР5.svg' },
  { name: 'ВР-06', img: 'images/doctors/ВР6.svg' },
  { name: 'ВР-07', img: 'images/doctors/ВР7.svg' },
  { name: 'ВР-08', img: 'images/doctors/ВР8.svg' }
];

const oArray = [
  { name: 'ООО-01', img: 'images/oo/О1.png' },
  { name: 'ООО-02', img: 'images/oo/О2.png' },
  { name: 'ООО-03', img: 'images/oo/О3.png' },
  { name: 'ООО-04', img: 'images/oo/О4.png' },
  { name: 'ООО-05', img: 'images/oo/О5.png' },
  { name: 'ООО-06', img: 'images/oo/О6.png' },
  { name: 'ООО-07', img: 'images/oo/О7.png' },
  { name: 'ООО-08', img: 'images/oo/О8.png' },
  { name: 'ООО-09', img: 'images/oo/О9.png' },
  { name: 'ООО-10', img: 'images/oo/О10.png' },
  { name: 'ООО-11', img: 'images/oo/О11.png' }
];

const test = [
  { name: "Compo", img: "images/test.jpg" },
  { name: "Compo 2", img: "images/testos.jpg" }
];

const IP = [
  {
    name: "ИП-01", img: "images/layouts/ИП/01.jpg"
  },
  {
    name: "ИП-02", img: "images/layouts/ИП/02.jpg"
  },
  {
    name: "ИП-03", img: "images/layouts/ИП/03.jpg"
  },
  {
    name: "ИП-04", img: "images/layouts/ИП/04.jpg"
  },
  {
    name: "ИП-05", img: "images/layouts/ИП/05.jpg"
  },
  {
    name: "ИП-06", img: "images/layouts/ИП/06.jpg"
  },
  {
    name: "ИП-07", img: "images/layouts/ИП/07.jpg"
  },
  {
    name: "ИП-08", img: "images/layouts/ИП/08.jpg"
  },
  {
    name: "ИП-09", img: "images/layouts/ИП/09.jpg"
  },
  {
    name: "ИП-10", img: "images/layouts/ИП/10.jpg"
  },
  {
    name: "ИП-11", img: "images/layouts/ИП/11.jpg"
  },
  {
    name: "ИП-12", img: "images/layouts/ИП/12.jpg"
  },
];

const AO = [
  {
    name: "АО-01", img: "images/layouts/АО/01.jpg"
  },
  {
    name: "АО-02", img: "images/layouts/АО/02.jpg"
  },
  {
    name: "АО-03", img: "images/layouts/АО/03.jpg"
  },
  {
    name: "АО-04", img: "images/layouts/АО/04.jpg"
  },
  {
    name: "АО-05", img: "images/layouts/АО/05.jpg"
  },
  {
    name: "АО-06", img: "images/layouts/АО/06.jpg"
  },
  {
    name: "АО-07", img: "images/layouts/АО/07.jpg"
  },
  {
    name: "АО-08", img: "images/layouts/АО/08.jpg"
  },
];

const OTK = [
  {
    name: "ОТК-01", img: "images/layouts/ОТК/01.jpg"
  },
  {
    name: "ОТК-02", img: "images/layouts/ОТК/02.jpg"
  },
  {
    name: "ОТК-03", img: "images/layouts/ОТК/03.jpg"
  }
];

const eklibris = [
  {
    name: "ЭК-01", img: "images/layouts/ЭКЛИБРИС/01.jpg"
  },
  {
    name: "ЭК-02", img: "images/layouts/ЭКЛИБРИС/02.jpg"
  },
  {
    name: "ЭК-03", img: "images/layouts/ЭКЛИБРИС/03.jpg"
  },
  {
    name: "ЭК-04", img: "images/layouts/ЭКЛИБРИС/04.jpg"
  },
  {
    name: "ЭК-05", img: "images/layouts/ЭКЛИБРИС/05.jpg"
  },
  {
    name: "ЭК-06", img: "images/layouts/ЭКЛИБРИС/06.jpg"
  },
  {
    name: "ЭК-07", img: "images/layouts/ЭКЛИБРИС/07.jpg"
  },
  {
    name: "ЭК-08", img: "images/layouts/ЭКЛИБРИС/08.jpg"
  },
];

const foreign = [
  {
    name: "ИН-01", img: "images/layouts/ИНОСТРАННЫЕ/01.jpg"
  },
  {
    name: "ИН-02", img: "images/layouts/ИНОСТРАННЫЕ/02.jpg"
  },
  {
    name: "ИН-03", img: "images/layouts/ИНОСТРАННЫЕ/03.jpg"
  },
  {
    name: "ИН-04", img: "images/layouts/ИНОСТРАННЫЕ/04.jpg"
  },
  {
    name: "ИН-05", img: "images/layouts/ИНОСТРАННЫЕ/05.jpg"
  },
  {
    name: "ИН-06", img: "images/layouts/ИНОСТРАННЫЕ/06.jpg"
  },
  {
    name: "ИН-07", img: "images/layouts/ИНОСТРАННЫЕ/07.jpg"
  },
  {
    name: "ИН-08", img: "images/layouts/ИНОСТРАННЫЕ/08.jpg"
  },
];

const comic = [
  {
    name: "ПР-01", img: "images/layouts/ПРИКОЛЬНЫЕ/01.jpg"
  },
  {
    name: "ПР-02", img: "images/layouts/ПРИКОЛЬНЫЕ/02.jpg"
  },
  {
    name: "ПР-03", img: "images/layouts/ПРИКОЛЬНЫЕ/03.jpg"
  },
  {
    name: "ПР-04", img: "images/layouts/ПРИКОЛЬНЫЕ/04.jpg"
  },
  {
    name: "ПР-05", img: "images/layouts/ПРИКОЛЬНЫЕ/05.jpg"
  },
  {
    name: "ПР-06", img: "images/layouts/ПРИКОЛЬНЫЕ/06.jpg"
  },
  {
    name: "ПР-07", img: "images/layouts/ПРИКОЛЬНЫЕ/07.jpg"
  },
  {
    name: "ПР-08", img: "images/layouts/ПРИКОЛЬНЫЕ/08.jpg"
  },
];

const kids = [
  {
    name: "ДТ-01", img: "images/layouts/ДЕТСКИЕ/01.jpg"
  },
  {
    name: "ДТ-02", img: "images/layouts/ДЕТСКИЕ/02.jpg"
  },
  {
    name: "ДТ-03", img: "images/layouts/ДЕТСКИЕ/03.jpg"
  },
  {
    name: "ДТ-04", img: "images/layouts/ДЕТСКИЕ/04.jpg"
  },
  {
    name: "ДТ-05", img: "images/layouts/ДЕТСКИЕ/05.jpg"
  },
  {
    name: "ДТ-06", img: "images/layouts/ДЕТСКИЕ/06.jpg"
  },
  {
    name: "ДТ-07", img: "images/layouts/ДЕТСКИЕ/07.jpg"
  },
  {
    name: "ДТ-08", img: "images/layouts/ДЕТСКИЕ/08.jpg"
  },
  {
    name: "ДТ-09", img: "images/layouts/ДЕТСКИЕ/09.jpg"
  },
  {
    name: "ДТ-10", img: "images/layouts/ДЕТСКИЕ/10.jpg"
  },
];

const mixed = [IP[0], IP[1], oArray[0], oArray[1], AO[0], AO[1], OTK[0], OTK[1], doctorsArray[0], doctorsArray[1], test[0], test[1], eklibris[0], eklibris[1], foreign[0], foreign[1], comic[0], comic[1], kids[0], kids[1]];

// Модальное окно услуг
const serviceModal = document.querySelector("#serviceModal");
const serviceInput = document.querySelector("#dropdown-input");

serviceInput.addEventListener("focus", () => {
  serviceModal.style.display = "block";
});

// Get the modal, button, and close elements
const modal = document.getElementById("sealModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal2 = document.getElementsByClassName("close")[0];
const closeModal = document.getElementsByClassName("close")[1];

// Function to open the modal
openModalBtn.onclick = function () {
  modal.style.display = "block";
  document.querySelector("#sealList").style.opacity = 1;
  document.querySelector("#sealList").style.zIndex = 10;
  showSealDetails();
};

// Function to close the modal when the "X" button is clicked
closeModal.onclick = function () {
  document.getElementById("sealDetails").innerHTML = "";
  modal.style.display = "none";
};

closeModal2.onclick = () => {
  console.log(document.querySelector("#serviceModal"));
  document.querySelector("#serviceModal").style.display = "none";
};

// Close modal if the user clicks outside of the modal
window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("sealDetails").innerHTML = "";
    modal.style.display = "none";
  }

  if (event.target === document.querySelector("#serviceModal")) {
    document.querySelector("#serviceModal").style.display = "none";
  }
};

// Event listener for seal option clicks
const sealOptions = document.querySelectorAll(".sealOption");
sealOptions.forEach(option => {
  option.addEventListener("click", function () {
    const sealId = this.getAttribute("data-id");
    showSealDetails(sealId);
    document.querySelector("#sealList").style.zIndex = 10;
    document.querySelector("#sealList").style.opacity = 1;
  });
});

// Function to display seal details in the modal
function showSealDetails(sealId) {
  let detailsContent = "";

  // Show details based on the selected seal option
  switch (sealId) {
    case "1":
      detailsContent += "<div class='imageGallery'>";
      IP.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy"> `;
      });
      detailsContent += "</div>";
      break;
    case "2":
      detailsContent += "<div class='imageGallery'>";
      oArray.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
    case "3":
      detailsContent += "<div class='imageGallery'>";
      AO.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy"> `;
      });
      detailsContent += "</div>";
      break;
    case "4":
      detailsContent += "<div class='imageGallery'>";
      OTK.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage"  loading="lazy" >`;
      });
      detailsContent += "</div>";
      break;
    case "5":
      detailsContent += "<div class='imageGallery'>";
      doctorsArray.forEach(doctor => {
        detailsContent += `<img src="${doctor.img}" alt="${doctor.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
    case "6":
      detailsContent += "<div class='imageGallery'>";
      test.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
    case "7":
      detailsContent += "<div class='imageGallery'>";
      eklibris.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy"> `;
      });
      detailsContent += "</div>";
      break;
    case "8":
      detailsContent += "<div class='imageGallery'>";
      foreign.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
    case "9":
      detailsContent += "<div class='imageGallery'>";
      comic.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
    case "10":
      detailsContent += "<div class='imageGallery'>";
      kids.forEach(oar => {
        detailsContent += `<img src="${oar.img}" alt="${oar.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
    default:
      detailsContent += "<div class='imageGallery'>";
      mixed.forEach(mix => {
        detailsContent += `<img src="${mix.img}" alt="${mix.name}" class="sealImage" loading="lazy">`;
      });
      detailsContent += "</div>";
      break;
  }

  // Update the modal with the details
  document.getElementById("sealDetails").innerHTML = detailsContent;
  const alls = document.querySelectorAll(".sealImage");
  alls.forEach((el) => {
    el.addEventListener("click", () => {
      const sealLayout = document.querySelector(".seal-layout");
      const pr = document.querySelector(".price-title1");
      sealLayout.src = el.src;
      sealLayout.classList.remove("hidden");
      sealLayout.nextElementSibling.classList.remove("hidden");
      document.getElementById("sealDetails").innerHTML = "";
      modal.style.display = "none";
      layoutPrice = 500;
      pr.textContent = layoutPrice + " ₽";
      const total = document.querySelector(".total");
      const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
      total.textContent = newTotal + " рублей";
      document.querySelector(".order_img_one-text").textContent = el.getAttribute("alt");
      openModalBtn.textContent = el.getAttribute("alt");
    });
  });
}

const checkboxes = document.querySelectorAll("input[name='service']");
checkboxes.forEach((check) => {
  check.addEventListener("change", () => {
    if (check.checked) {
      check.parentElement.parentElement.nextElementSibling.style.display = "block";
      checkboxes.forEach((otherCheck) => {
        if (otherCheck !== check) {
          otherCheck.parentElement.parentElement.nextElementSibling.style.display = "none";
          otherCheck.checked = false;
        }
      });
    }
  });
});

const subOptions = document.querySelectorAll('.sub-option');
const inputField = document.getElementById('dropdown-input');
const dropdown = document.querySelector('.dropdown');

// When a sub-option is clicked, set the input value and prevent the dropdown from closing
subOptions.forEach(subOption => {
  subOption.addEventListener('click', function (e) {
    const element = this.parentElement.previousElementSibling.lastElementChild;
    const mainCategory = element.querySelector('span').textContent.trim();
    const dataResult = element.dataset.resultText;

    const subOptionText = this.textContent.trim();

    inputField.value = `${mainCategory}, ${subOptionText}`;
    const titles = document.querySelectorAll(".order_img_one-title");
    titles[0].textContent = "Клише для " + dataResult + ", " + subOptionText;

    dropdown.style.display = 'none';
    document.querySelector("#serviceModal").style.display = "none";
  });
});

// Show the dropdown on input focus
inputField.addEventListener('focus', function () {
  dropdown.style.display = 'grid';
});

const deliveryOptions = document.querySelectorAll(".delivery-option");
const deliveryPriority = document.querySelectorAll(".delivery-priority");
const deliveryTypeTextHtml = document.querySelector(".delivery_type-delivery");
const deliveryDateTextHtml = document.querySelector(".delivery_type-date");
const successModal = document.getElementById("successModal");

deliveryOptions.forEach((delType) => {
  delType.addEventListener("click", () => {
    const total = document.querySelector(".total");
    const number = delType.textContent.match(/\d+/); // This will give you the number as a string
    if (number) {
      deliverPrice = +number[0];
      const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
      total.textContent = newTotal + " рублей";

      deliveryTypeTextHtml.value = delType.textContent;
    } else {
      deliverPrice = 0;
      const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
      total.textContent = newTotal + " рублей";

      deliveryTypeTextHtml.value = delType.textContent;
    }
  });
});

deliveryPriority.forEach((delType) => {
  delType.addEventListener("click", () => {
    const total = document.querySelector(".total");
    const number = delType.textContent.match(/\d+/); // This will give you the number as a string
    console.log(number);
    if (number && number[0].length > 2) {
      preparationFee = +number[0];
      const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
      total.textContent = newTotal + " рублей";

      deliveryDateTextHtml.value = delType.textContent;

    } else {
      preparationFee = 0;
      const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
      total.textContent = newTotal + " рублей";

      deliveryDateTextHtml.value = delType.textContent;

    }
  });
});

openBtn.addEventListener('click', function () {
  popup.showModal();
  const sealsContainer = document.querySelector(".seals-container");
  if (sealsContainer.childNodes.length !== 1) {
    return;
  }

  seals.forEach((seal, index) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("seals-div");
    const imgWithPContainer = document.createElement("div");
    imgWithPContainer.classList.add("seals_img-div");
    const img = document.createElement("img");
    const title = document.createElement("p");
    const p = document.createElement("p");

    title.textContent = seal.name;

    p.textContent = seal.price + " ₽";
    p.style.color = "#bd3b13";
    p.style.fontSize = "18px";
    img.src = seal.href;
    img.classList.add("seal-modal-images");
    img.setAttribute('loading', 'lazy');
    imgContainer.append(img, title, p);
    imgWithPContainer.append(img, title);
    sealsContainer.appendChild(imgContainer);
    imgContainer.appendChild(imgWithPContainer);

    img.addEventListener("click", () => {
      const target = document.querySelector(".seal-img-target");
      const overallPrice = document.querySelector(".total");
      const sealTitle = document.querySelector(".seal-title");

      const titles = document.querySelectorAll(".order_img_one-title");

      titles[1].textContent = "Ocтнастка " + seal.titleName;
      const price = document.querySelector(".price-title2");
      target.src = seal.href;
      price.textContent = p.textContent;
      sealTitle.textContent = seal.sealName;
      openBtn.textContent = seal.name;

      sealPrice = seal.price;
      overallPrice.textContent = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee + " рублей";
      popup.close();
      target.classList.remove("hidden");
    });
  });
});

// Модальные окна для изготовления и доставки
const manufacturingModal = document.getElementById("manufacturingModal");
const deliveryModal = document.getElementById("deliveryModal");
const manufacturingInput = document.querySelector(".delivery_type-date");
const deliveryInput = document.querySelector(".delivery_type-delivery");

// Открытие модального окна для изготовления
manufacturingInput.addEventListener("click", () => {
  manufacturingModal.style.display = "block";
});

// Открытие модального окна для доставки
deliveryInput.addEventListener("click", () => {
  deliveryModal.style.display = "block";
});

// Закрытие модальных окон
const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal");
    if (modal) {
      modal.style.display = "none";
    }
  });
});

// Закрытие при клике вне модального окна
window.addEventListener("click", (e) => {
  if (e.target === manufacturingModal) {
    manufacturingModal.style.display = "none";
  }
  if (e.target === deliveryModal) {
    deliveryModal.style.display = "none";
  }
  if (e.target === successModal) {
    successModal.style.display = "none";
  }
});

// Обработка выбора опций
const optionItems = document.querySelectorAll(".option-item");
optionItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.getAttribute("data-value");
    const price = item.getAttribute("data-price");
    const modal = item.closest(".modal");
    
    if (modal.id === "manufacturingModal") {
      manufacturingInput.value = value;
      // Обновляем цену для изготовления
      const number = price.match(/\d+/);
      if (number && number[0].length > 2) {
        preparationFee = +number[0];
      } else {
        preparationFee = 0;
      }
    } else if (modal.id === "deliveryModal") {
      deliveryInput.value = value;
      // Обновляем цену для доставки
      const number = price.match(/\d+/);
      if (number) {
        deliverPrice = +number[0];
      } else {
        deliverPrice = 0;
      }
    }
    
    // Обновляем общую стоимость
    const total = document.querySelector(".total");
    const newTotal = (sealPrice + layoutPrice) * res.innerText + deliverPrice + preparationFee;
    total.textContent = newTotal + " рублей";
    
    modal.style.display = "none";
  });
});

// Dialog обработчики
const dialogElement = document.querySelector('dialog');
const closeButton = dialogElement.querySelector('.dialog-close');

// Close dialog when clicking the close button
closeButton.addEventListener('click', () => {
  dialogElement.close();
});

// Close when clicking outside
dialogElement.addEventListener('click', (e) => {
  const dialogDimensions = dialogElement.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialogElement.close();
  }
});
