/*
 * declaring a variable for the whole deck div
 * declaring array holding the content of the cards
 */
let deck = document.querySelector(".deck");
let cards = ["<i class=\"fas fa-gamepad\"></i>",
  "<i class=\"fas fa-gamepad\"></i>",
  "<i class=\"fas fa-ambulance\"></i>",
  "<i class=\"fas fa-ambulance\"></i>",
  "<i class=\"fas fa-birthday-cake\"></i>",
  "<i class=\"fas fa-birthday-cake\"></i>",
  "<i class=\"fas fa-chess\"></i>",
  "<i class=\"fas fa-chess\"></i>",
  "<i class=\"fab fa-fort-awesome\"></i>",
  "<i class=\"fab fa-fort-awesome\"></i>",
  "<i class=\"fas fa-bomb\"></i>",
  "<i class=\"fas fa-bomb\"></i>",
  "<i class=\"fas fa-plane\"></i>",
  "<i class=\"fas fa-plane\"></i>",
  "<i class=\"fas fa-university\"></i>",
  "<i class=\"fas fa-university\"></i>"
];

/*
 * shuffle function from http://stackoverflow.com/a/2450976
 */

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * function for dealing cards in shuffled order
 * create cards, add style to them and fontawesome icon
 */
function dealCards(cards) {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    let cardItem = document.createElement("div");
    cardItem.className = "card";
    let icon = cards[i];
    cardItem.innerHTML = icon;
    deck.appendChild(cardItem);
  }
}

/*
 * function for removing cards from DOM
 */
function removeCards(cards) {
  let cardsToRemove = document.querySelectorAll(".card");
  for (let i = 0; i < cardsToRemove.length; i++) {
    cardsToRemove[i].remove();
  }
}

/*
 *functions for changing the css of cards based on their status during the game
 */
function flipCard(card) {
  card.classList.add("show");
  flippedCards.push(card);
}

function matched(card) {
  card.classList.add("matched");
  flippedCards.pop(card);
}

function hideCard(card) {
  card.classList.remove("show");
  flippedCards.pop(card);
}

/*
 * function for a new game
 */
function replay() {
  removeCards();
  dealCards(cards);
}

/*
 * automatically deal cards when page is loaded
 */
document.addEventListener("DOMContentLoaded", dealCards(cards));

/*
 * handling click on a card
 * 1) show card after click => call flipCard functions
 * 2) check if list flippedCards has alredy 2 cards to be matched
 * => if they match, use matched function on both cards
 * => if they do not match, hide them (remove them from list and remove css class)
 * => increment the counter for moves done by player and display it on the page
 * 3) check if all cards have been matched
 * 4) implement timer
 * 5) handle the stars (desrease them according to number of moves)
 * 6) display modal - with congrats, time, stars and replay option
 */
let allCards = document.querySelectorAll(".card");
let flippedCards = [];

allCards.forEach(function(card) {
  card.addEventListener("click", function() {
    console.log("clik on the card");
  });
});
