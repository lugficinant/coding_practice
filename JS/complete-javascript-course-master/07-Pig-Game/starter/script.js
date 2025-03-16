'use strict';
//display elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const dicEl = document.querySelector('.dice');

//button of dice
const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//preset the game
score0El.textContent = 0;
score1El.textContent = 0;
dicEl.classList.add('hidden');

//Rolling dice
let totalScores, currentScore, activePlayer, playing;

function initGame() {
  //game data
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //display
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//``````````````````````````````````````````````````process
initGame();

//btn Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating a random numerber 1-6
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(`your number is ${diceNum}`);
    //display the dice
    dicEl.classList.remove('hidden');
    dicEl.src = `dice-${diceNum}.png`;
    //handle the number 1 or else
    if (diceNum !== 1) {
      // currentScore = currentScore + diceNum;
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      switchPlayer();

      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
    }
  }
});

//btn hold
btnHold.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    console.log(`score--${activePlayer}`);
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 15 && playing) {
      //shut down the game
      playing = false;
      //display winner
      console.log(`current--${activePlayer} is winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

//btn new game
btnNew.addEventListener('click', initGame);
