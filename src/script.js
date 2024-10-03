'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const WINNING_SCORE = 20;

// Helper function to update current score
const updateCurrentScore = (player, score) => {
  document.getElementById(`current--${player}`).textContent = score;
};

// Reset function
const reset = () => {
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Switch player
const switchPlayer = () => {
  updateCurrentScore(activePlayer, 0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

reset();

// Rolling dice functionality
rollDiceBtn.addEventListener('click', () => {
  if (!playing) return;

  const randomDiceRoll = Math.ceil(Math.random() * 6);
  diceEl.classList.remove('hidden');
  diceEl.src = `image/dice-${randomDiceRoll}.png`;

  if (randomDiceRoll !== 1) {
    currentScore += randomDiceRoll;
    updateCurrentScore(activePlayer, currentScore);
  } else {
    switchPlayer();
  }
});

// Hold score functionality
holdScoreBtn.addEventListener('click', () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= WINNING_SCORE) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

// New game functionality
newGameBtn.addEventListener('click', reset);
