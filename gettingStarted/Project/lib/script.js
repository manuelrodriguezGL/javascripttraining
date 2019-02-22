//
// Blackjack
// by Manuel Rodriguez
// Following Mark Zamoyta's tutorial
// https://app.pluralsight.com/library/courses/javascript-getting-started/table-of-contents
//

let space = '  ';

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = [
  'Ace',
  'King',
  'Queen',
  'Jack',
  'Ten',
  'Nine',
  'Eight',
  'Seven',
  'Six',
  'Five',
  'Four',
  'Three',
  'Two',
];

// DOM Variables
let textArea = document.getElementById('text-area'),
  newGameButton = document.getElementById('new-game-button'),
  hitButton = document.getElementById('hit-button'),
  stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  playerCards = [getNextCard(), getNextCard()];
  dealerCards = [getNextCard(), getNextCard()];

  textArea.innerText = 'Started...';

  hideNewGameButton();
  showStatus();
});

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx],
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getNextCard() {
  return deck.shift();
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }

  let dealerCardString = '';
  let playerCardString = '';

  // printDeck();

  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  console.log('Dealer: ' + dealerCardString);

  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  console.log('Player: ' + playerCardString);

  updateScores();

  textArea.innerText =
    'Dealer has: \n' +
    dealerCardString +
    '(score: ' +
    dealerScore +
    ')\n\n' +
    'Player has: \n' +
    playerCardString +
    '(score: ' +
    playerScore +
    ')\n\n';

  if (gameOver) {
    if (playerWon) {
      textArea.innerText += 'YOU WIN!!!';
    } else {
      textArea.innerText += 'DEALER WINS!!!';
    }

    showNewGameButton();
  }
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score <= 21) {
    return (score += 10);
  }
  return score;
}

function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function checkForEndOfGame() {
  updateScores();

  if (gameOver) {
    while (
      dealerScore < playerScore &&
      playerScore <= 21 &&
      dealerScore <= 21
    ) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
  }
}

function hideNewGameButton() {
  newGameButton.style.display = 'none';
  if (hitButton.style.display === 'none') hitButton.style.display = 'inline';
  if (stayButton.style.display === 'none') stayButton.style.display = 'inline';
}

function showNewGameButton() {
  newGameButton.style.display = 'inline';
  if (hitButton.style.display === 'inline') hitButton.style.display = 'none';
  if (stayButton.style.display === 'inline') stayButton.style.display = 'none';
}

function printDeck() {
  for (let i = 0; i < deck.length; i++) {
    console.log(deck[i]);
  }
}
