'use strict';

//*************************select element message
// . for class / # for id
// console.log(document.querySelector('.message'));
// //get first property textcontent of element of class message
// console.log(document.querySelector('.message').textContent);
// //if you want to assign string to show, you have to select property textcontent :)
// document.querySelector('.message').textContent = 'hehe';

//***************************************************** Game logic ***************************************************

//first of all, difine your secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
//store it into our app

//set a score
let score = 20;
//set a highest score
let highScore = 0;

//listen a event
//so we choose button 'check' to triger event that inspect the value from 'guess'
//1st argument is where to listen 2nd argument is then to run
document.querySelector('.check').addEventListener('click', function () {
  // document.querySelector('.message').textContent = 'well done BRO';

  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (guess) {
    if (score > 1) {
      //guess right
      if (guess === secretNumber) {
        document.querySelector('.message').textContent = 'you are right bro 😘';

        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        //show number when guess right
        document.querySelector('.number').textContent = secretNumber;
        if (score > highScore) {
          highScore = score;
          document.querySelector('.highscore').textContent = `${highScore}`;
          // document.querySelector('.highscore').textContent = highScore;
        }
      } else if (guess !== secretNumber) {
        document.querySelector('.message').textContent =
          guess > secretNumber
            ? 'you are too big bro 😎'
            : 'you are too small bro 😂';
        score--;
      } else {
        document.querySelector('.message').textContent = 'you lose 😒';
        document.querySelector('.score').textContent = 0;
      }
    } else {
      document.querySelector('.message').textContent =
        'you have input a number 🤣';
    }
  }
});

// document.querySelector('.again').addEventListener('click', function () {
//   document.querySelector('.message').textContent = 'Start guessing...';
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.score').textContent = '20';
//   document.querySelector('.guess').value = '';

//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.number').style.width = '15rem';

//   secretNumber = Math.trunc(Math.random() * 20) + 1;
//   score = 20;
// });

document.querySelector('.again').addEventListener('click', resetFunc);

function resetFunc() {
  console.log('lets reset');
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = '20';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
}

//use DOM change CSS style
