const gameContainer = document.getElementById("game");
const divs = document.querySelectorAll('div');
let score = 0;
let h3Score = document.querySelector('#h3Score');
h3Score.textContent = `Score: ${score}`;
let lives = 3;
const h3Lives = document.querySelector('#h3Lives');
h3Lives.textContent = `Lives: ${lives}`;
let mainDiv = document.querySelector("#game");
let cardClicked = 0;
let flipped = [];
let isGameFinished = false;

//When player loses all lives the game loads the game over screen.
function GameFinished(){
    if (lives <= 0){
        isGameFinished = true;
    }
    if(isGameFinished){
        setTimeout(function(){
        window.location = 'powell-memorygame-gameover.html';
        }, 500);
    }
}
function noMatch(){
    if(flipped[0].className !== flipped[1].className){
        setTimeout(function(){
        flipped[0].style.backgroundColor = 'white';
        flipped[1].style.backgroundColor = 'white';
        flipped = [];
        console.log(cardClicked);
        cardClicked = 0;
        lives--;
        h3Lives.textContent = `Lives: ${lives}`;
        }, 1000);
    }
}

setInterval(GameFinished, 500)
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  let card = e.target;
  if(card != flipped[0] && cardClicked < 2 && card.id !== "game" && lives > 0){
    card.style.backgroundColor = card.className.toString().toLowerCase();
    flipped.push(card);
    cardClicked ++;
  }
  if(flipped[0].className !== flipped[1].className){
      noMatch();
  }else {
    score++;
    h3Score.textContent = `Score: ${score}`;
    cardClicked = 0;
    flipped = [];
    }
}
// when the DOM loads
createDivsForColors(shuffledColors);