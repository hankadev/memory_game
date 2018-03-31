(function() {
  "use strict";
  let deck = document.querySelector(".deck");
  let replyBtn = document.querySelectorAll(".replay");
  let modalWindow = document.querySelector(".modal");
  let closeBtn = document.querySelector(".closeBtn");
  let flippedCards = [];
  let counter = 0;
  let time = 0;
  let minutes = document.querySelector(".minutes");
  let secondes = document.querySelector(".secondes");
  let moves = document.querySelector(".moves");
  let matchedCards = 0;
  let cardsToFlip = 2;
  let fullStar = "<i class=\"fas fa-star\"></i>";
  let emptyStar = "<i class=\"far fa-star\"></i>";
  let star2 = document.querySelector(".star2");
  let star3 = document.querySelector(".star3");
  let scoreMoves = document.querySelector(".scoreMoves");
  let cards = ["img/panda.png", "img/panda.png",
    "img/elephant.png", "img/elephant.png",
    "img/bear.png", "img/bear.png",
    "img/koala.png", "img/koala.png",
    "img/hippo.png", "img/hippo.png",
    "img/gorilla.png", "img/gorilla.png",
    "img/walrus.png", "img/walrus.png",
    "img/tiger.png", "img/tiger.png"];
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

  function dealCards(cards) {
    shuffle(cards);
    for (let i = 0; i < cards.length; i++) {
      let cardItem = document.createElement("div");
      cardItem.className = "card";
      let source = cards[i];
      cardItem.innerHTML = "<img src=\"" + source + "\">";
      deck.appendChild(cardItem);
    }
  }

  function removeCards() {
    let cardsToRemove = document.querySelectorAll(".card");
    for (let i = 0; i < cardsToRemove.length; i++) {
      cardsToRemove[i].remove();
    }
  }

  function flipCard(card) {
    setTimeout(function() {
      card.classList.toggle("flip");
      card.classList.add("show");
      card.firstElementChild.style.visibility = "visible";
      flippedCards.push(card);
    }, 300);
  }

  function matched(card1, card2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
  }

  function hideCards(card1, card2) {
    setTimeout(function() {
      card1.classList.remove("show");
      card1.firstElementChild.style.visibility = "hidden";
      card1.classList.toggle("shake");
      card2.classList.remove("show");
      card2.firstElementChild.style.visibility = "hidden";
      card2.classList.toggle("shake");
      flippedCards = [];
    }, 750);
    card1.classList.toggle("shake");
    card2.classList.toggle("shake");
  }

  function showModal(moves) {
    setTimeout(function() {
      modalWindow.style.display = "flex";
      scoreMoves.innerHTML = moves;
      let scoreStars = document.querySelector(".scoreStars");
      let stars = document.querySelector(".stars");
      scoreStars.innerHTML = stars.innerHTML;
      let gameTime = document.querySelector(".gameTime");
      let modalTime = document.querySelector(".modalTime");
      modalTime.innerHTML = gameTime.innerHTML;
    }, 1000);
  }

  function hideModal() {
    modalWindow.style.display = "none";
  }

  function decreaseStar(moves) {
    if (moves > 15) {
      star3.innerHTML = emptyStar;
    }
    if (moves > 20) {
      star2.innerHTML = emptyStar;
    }
  }

  function resetStars() {
    star2.innerHTML = fullStar;
    star3.innerHTML = fullStar;
  }
  /*
   * function has as argument an array of flipped cardsArray
   * shows both card for a second (750 miliseconds)
   * checks if the cards matched or not
   * if they do, marks them as matched, if not, flippes them back
   * incrementing the counter for number of removeCards
   * displaying the number of moves in DOM
   * checks if all cards are matched => win
   */
  function waitAndCheck(cardsArray) {
    setTimeout(function() {
      let icon1 = cardsArray[0].innerHTML;
      let icon2 = cardsArray[1].innerHTML;
      if (icon1 === icon2) {
        matched(cardsArray[0], cardsArray[1]);
        cardsToFlip = 2;
        matchedCards += 2;
      } else {
        hideCards(cardsArray[0], cardsArray[1]);
        cardsArray[0].addEventListener("click", listen);
        cardsArray[1].addEventListener("click", listen);
        cardsToFlip = 2;
      }
      counter += 1;
      moves.innerHTML = counter;
      decreaseStar(counter);
      if (matchedCards === 16) {
        clearInterval(interval);
        showModal(counter);
      }
    }, 750);
  }
  let listen = function() {
    if (cardsToFlip > 0) {
      cardsToFlip -= 1;
      this.removeEventListener("click", listen);
      flipCard(this);
      this.classList.toggle("flip");
    }
    if (cardsToFlip === 0) {
      cardsToFlip = -1;
      waitAndCheck(flippedCards);
    }
  };

  let interval;
  let startTimer = function() {
    interval = setInterval(function() {
      time += 1;
      convertTime(time);
    }, 1000);
    deck.removeEventListener("click", startTimer);
  };

  function convertTime(sec) {
    const elapsedMinutes = Math.floor(sec / 60);
    minutes.innerHTML = elapsedMinutes;
    const elapsedSecondes = sec % 60;
    secondes.innerHTML = elapsedSecondes;
  }

  function game() {
    dealCards(cards);
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card) {
      card.addEventListener("click", listen);
      card.addEventListener("mousedown", function(e) {
        e.preventDefault();
      });
    });
  }

  function replay() {
    hideModal();
    removeCards();
    resetStars();
    flippedCards = [];
    counter = 0;
    time = 0;
    moves.innerHTML = counter;
    minutes.innerHTML = 0;
    secondes.innerHTML = 0;
    matchedCards = 0;
    cardsToFlip = 2;
    game();
    clearInterval(interval);
    deck.addEventListener("click", startTimer);
  }
  /*
   * automatically deal cards when page is loaded
   * automatically start a new game
   */
  document.addEventListener("DOMContentLoaded", function() {
    game();
    deck.addEventListener("click", startTimer);
  });
  replyBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
      replay();
    });
  });
  closeBtn.addEventListener("click", function() {
    hideModal();
  });
  modalWindow.addEventListener("click", function() {
    hideModal();
  });
}());
