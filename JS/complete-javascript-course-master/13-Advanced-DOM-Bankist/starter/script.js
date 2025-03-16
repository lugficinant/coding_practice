'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//*********************************** select element/
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

//*********************************** creat element/
console.log(document.doc);

//make a new element
const message = document.createElement('div');
message.classList.add('cookie-message');
//edit content of element
message.innerHTML =
  'we use cookied for improved functionality and analytics. <button class="btn btn--close-coockie">Got it!</button>';
//**********************inser into DOM/position
//DOM ele is unique
//prepend add message to header as its first child
// header.prepend(message);
//append add message to header as its last child/move element/it is a live element!!!
header.append(message);
//if you want to copy element
// header.append(message.cloneNode(true));
header.before(message); //to be silbing
// header.after(message);

//*********************************** delete element/
//button
document
  .querySelector('.btn--close-coockie')
  .addEventListener('click', function () {
    message.remove();
  });
//anywhere inside this element
message.addEventListener('click', function () {
  message.remove();
});

//********************************** styles attributes and classes */

//************styles */
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//check style content in real time
console.log(getComputedStyle(message).color);
//setting hight
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//********************************** css */
//set css variable
document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.scr);

//Non standerd
logo.getAttribute('designer');
