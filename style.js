const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  // selecting random holes
  //math.random will give random number btw 0 to 0.99999
  //here we need to select the 6 holes randomly.
  //so multiplying the math.random * holes.length(6). will give us float values between 0.smthg to 5.smthg
  //Math.floor is used to convert the float values to integer.Hence we get the index from 0 to 5

  const index = Math.floor(Math.random() * holes.length); // will generate random from 0 to 5
  const hole = holes[index];

  if (hole === lastHole) {
    console.log("same hole!");
    return randomHole(holes); // call the function again when same hole
  }
  lastHole = hole;
  return hole;
}
function peep() {
  // getting the moles to pop up
  const time = randTime(200, 2000);
  const hole = randomHole(holes);
  hole.classList.add("up"); // will make top 0 . ie. will make the moles to come up.
  setTimeout(() => {
    // remove class on timeout
    hole.classList.remove("up");
    if (!timeUp) {
      peep();
    }
  }, time);
}
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000); // after 10000ms the timeUp is set to true i.e stopping the game.
}
function bonk(e) {
  //increasing score when we bonk the mole and removing the class.
  if (!e.isTrusted) {
    // isTrusted is used to check if the click us user ui generated or script generated. if by script cheater!
    return; //cheater!
  }
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}
moles.forEach((mole) => mole.addEventListener("click", bonk));
