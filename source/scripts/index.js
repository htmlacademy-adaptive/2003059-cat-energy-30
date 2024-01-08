// Бургер-меню

const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

function toggleMenu() {
  if (navMain.classList.contains('main-nav--close')) {
    navMain.classList.remove('main-nav--close');
    navMain.classList.add('main-nav--open');
  } else {
    navMain.classList.add('main-nav--close');
    navMain.classList.remove('main-nav--open');
  }
}

navToggle.addEventListener('click', toggleMenu);


// Слайдер с котом

const slider = document.querySelector('.comparison__images');
const before = document.querySelector('.comparison__image-wrapper--before');
const change = document.querySelector('.comparison__range');
const body = document.body;

let isActive = false;

// при нажатии мышкой и удержании
body.addEventListener('mouseup', () => {
  isActive = false;
});

// при отпускании мышки
body.addEventListener('mousedown', () => {
  isActive = true;
});

// мышка ушла за пределы
body.addEventListener('mouseleave', () => {
  isActive = false;
});

// x - позиция по оси x, находим значение от 0 до максимума - не выходя за пределы
const beforeAfterSlider = (x) => {
  const shift = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = `${shift}px`;
  change.style.left = `${shift}px`;
};

// функция останавливает событие после скролла
const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

//двигаем мышкой
body.addEventListener('mousemove', (e) => {
  if (!isActive) {
    return; //если mousemove false - выходим из функции
  }

  let x = e.pageX; // узнаем значение координаты мышки при вводе
  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(e);
});

// для мобильных устройств
change.addEventListener('touchstart', () => {
  isActive = true;
});

body.addEventListener('touchend', () => {
  isActive = false;
});

body.addEventListener('touchcancel', () => {
  isActive = false;
});

body.addEventListener('touchmove', (e) => {
  if (!isActive) {
    return;
  }

  let x;
  let i;

  // changedTouches - список точек касания (по которым прошел палец во время touch)
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;

  beforeAfterSlider(x);
  pauseEvents(e);
});
