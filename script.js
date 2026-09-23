const menu = document.querySelector('.menu-button');
const burgerMenu = document.querySelector('.burger-menu');
const closeButton = document.querySelector('.burger-menu__close');


// ==============================
// БУРГЕР-МЕНЮ
// ==============================

function openBurgerMenu() {
  if (!menu || !burgerMenu) return;

  menu.classList.add('is-open');
  burgerMenu.classList.add('is-open');

  menu.setAttribute('aria-expanded', 'true');
  burgerMenu.setAttribute('aria-hidden', 'false');

  document.body.classList.add('menu-open');
}


function closeBurgerMenu() {
  if (!menu || !burgerMenu) return;

  menu.classList.remove('is-open');
  burgerMenu.classList.remove('is-open');

  menu.setAttribute('aria-expanded', 'false');
  burgerMenu.setAttribute('aria-hidden', 'true');

  document.body.classList.remove('menu-open');
}


// Открытие / закрытие меню
menu?.addEventListener('click', () => {

  if (burgerMenu.classList.contains('is-open')) {
    closeBurgerMenu();
  } else {
    openBurgerMenu();
  }

});


// Кнопка X
closeButton?.addEventListener('click', () => {
  closeBurgerMenu();
});


// Закрытие после выбора пункта меню
document.querySelectorAll('.burger-menu a').forEach((link) => {

  link.addEventListener('click', () => {
    closeBurgerMenu();
  });

});


// Закрытие по Escape
document.addEventListener('keydown', (event) => {

  if (event.key === 'Escape') {
    closeBurgerMenu();
  }

});


// ==============================
// АНИМАЦИЯ ПОЯВЛЕНИЯ
// ==============================

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add('is-visible');

      observer.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});


document.querySelectorAll('.reveal').forEach((el, index) => {

  el.style.transitionDelay =
    `${Math.min(index * 45, 240)}ms`;

  observer.observe(el);

});


// ==============================
// ПАРАЛЛАКС ГЕРБА
// ==============================

const emblem = document.querySelector('.hero__emblem');

window.addEventListener('scroll', () => {

  if (!emblem || window.innerWidth < 700) return;

  const y = Math.min(window.scrollY * 0.10, 35);

  emblem.style.transform = `translateY(${y}px)`;

}, {
  passive: true
});


// ==============================
// РАСКРЫВАЮЩАЯСЯ СЕКЦИЯ «ОБРАЗОВАТЕЛЬНЫЙ КРЕДИТ»
// ==============================

const educationButton = document.querySelector('.education-credit-button');
const educationCredit = document.querySelector('#education-credit');

if (educationButton && educationCredit) {

  const openEducationCredit = () => {
    educationCredit.hidden = false;
    // Форсируем reflow, чтобы transition сработал после снятия hidden
    void educationCredit.offsetHeight;
    educationCredit.classList.add('is-open');
    educationButton.setAttribute('aria-expanded', 'true');

    educationCredit.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const closeEducationCredit = () => {
    educationCredit.classList.remove('is-open');
    educationButton.setAttribute('aria-expanded', 'false');

    // Ждём окончания анимации, затем скрываем
    educationCredit.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'grid-template-rows') {
        educationCredit.hidden = true;
        educationCredit.removeEventListener('transitionend', handler);
      }
    });
  };

  educationButton.addEventListener('click', () => {
    if (educationCredit.classList.contains('is-open')) {
      closeEducationCredit();
    } else {
      openEducationCredit();
    }
  });

}

// ==============================
// РАСКРЫВАЮЩАЯСЯ СЕКЦИЯ «ОБЩЕЖИТИЕ»
// ==============================

(function initDormitory(){
  const btn = document.querySelector('.dormitory-button');
  const section = document.getElementById('dormitory');
  if (!btn || !section) return;

  const open = () => {
    section.hidden = false;
    void section.offsetHeight;
    section.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const close = () => {
    section.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    section.addEventListener('transitionend', function handler(e){
      if (e.propertyName === 'grid-template-rows') {
        section.hidden = true;
        section.removeEventListener('transitionend', handler);
      }
    });
  };

  btn.addEventListener('click', () => {
    section.classList.contains('is-open') ? close() : open();
  });
})();

// ==============================
// КАРУСЕЛЬ ОБЩЕЖИТИЯ
// ==============================

(function initDormCarousel(){
  const viewport = document.getElementById('dormCarousel');
  if (!viewport) return;

  const track = viewport.querySelector('.dorm-carousel__track');
  const images = track.querySelectorAll('img');
  const prevBtn = document.querySelector('.dorm-arrow[data-dir="prev"]');
  const nextBtn = document.querySelector('.dorm-arrow[data-dir="next"]');

  if (!images.length) return;

  let index = 0;

  // Сколько фото помещается в ряд
  function getPerView() {
    const w = window.innerWidth;
    if (w >= 1000) return 3;
    if (w >= 700) return 2;
    return 1;
  }

  function maxIndex() {
    return Math.max(0, images.length - getPerView());
  }

  function update() {
    const perView = getPerView();
    const gap = 12;
    const imgWidth = (viewport.clientWidth - gap * (perView - 1)) / perView;
    const offset = index * (imgWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    // Синхронизируем ширину каждого фото (на случай изменения окна)
    images.forEach(img => {
      img.style.flexBasis = `${imgWidth}px`;
      img.style.width = `${imgWidth}px`;
    });

    // Активные / неактивные стрелки
    if (prevBtn) prevBtn.disabled = index <= 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex();
  }

  prevBtn?.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    update();
  });

  nextBtn?.addEventListener('click', () => {
    index = Math.min(maxIndex(), index + 1);
    update();
  });

  // При ресайзе — не даём «уехать» за пределы
  window.addEventListener('resize', () => {
    index = Math.min(index, maxIndex());
    update();
  });

  // Инициализация
  update();
})();

// ==============================
// РАСКРЫВАЮЩАЯСЯ СЕКЦИЯ «СТИПЕНДИИ»
// ==============================

(function initScholarships(){
  const btn = document.querySelector('.scholarships-button');
  const section = document.getElementById('scholarships');
  if (!btn || !section) return;

  const open = () => {
    section.hidden = false;
    void section.offsetHeight;
    section.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const close = () => {
    section.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    section.addEventListener('transitionend', function handler(e){
      if (e.propertyName === 'grid-template-rows') {
        section.hidden = true;
        section.removeEventListener('transitionend', handler);
      }
    });
  };

  btn.addEventListener('click', () => {
    section.classList.contains('is-open') ? close() : open();
  });
})();