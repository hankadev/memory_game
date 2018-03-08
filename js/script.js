/**
 * declaring variable for the card deck
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

/**
 * shuffle function from http://stackoverflow.com/a/2450976
 */

function shuffle(array) {
  var currentIndex = array.length,
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

function dealCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    let cardItem = document.createElement("li");
    cardItem.className = "card";
    let icon = cards[i];
    cardItem.innerHTML = icon;
    deck.appendChild(cardItem);
  }
}

shuffle(cards);
dealCards(cards);
