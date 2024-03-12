resultDisplay = document.querySelector("#result");
highScore= document.querySelector("#highScore");
width = 20;
height = 20;
let shooterPosition = 370;
const total = width * height;
const asteroids = [];
let asteroidLength;
let i = 0;
let result=0;
let playing=true
let asteroidId;
let numberOfAsteroids=Math.ceil(Math.random() * 50);

//create board
function createBoard() {
    const board = document.querySelector(".grid");
    for (let i = 0; i < width * height; i++) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      board.appendChild(square);
    }
  }
  createBoard();
  const squares = Array.from(document.querySelectorAll(".grid div"));

    function putAsteroid() {
      i = Math.ceil(Math.random() * numberOfAsteroids);
      console.log(i);
      for (let j = 0; j < i; j++) {
        let index = Math.ceil(Math.random() * total);
        asteroids.push(index);
      }
      console.log(asteroids);
      for (let j = 0; j < asteroids.length; j++) {
        squares[asteroids[j]].classList.add("asteroid");
      }
    }
    asteroidLength=asteroids.length;

    function createShooter() {
      squares[shooterPosition].classList.add("shooter");
    }

    function updateShooter() {
      squares[shooterPosition].classList.remove("shooter");
      squares[shooterPosition].classList.add("shooter");
    }

    function moveShooter(e) {
      squares[shooterPosition].classList.remove("shooter");
      switch (e.key) {
        case "ArrowLeft":
          if (shooterPosition % width !== 0) shooterPosition -= 1;
          break;
        case "ArrowRight":
          if (shooterPosition % width < width - 1) shooterPosition += 1;
          break;
      }
      squares[shooterPosition].classList.add("shooter");
    }

    function shoot(e) {
      let laserId;
      let currentLaserIndex = shooterPosition;
      function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");
        if (squares[currentLaserIndex].classList.contains("asteroid")) {
          squares[currentLaserIndex].classList.remove("laser");
          squares[currentLaserIndex].classList.remove("asteroid");
          squares[currentLaserIndex].classList.add("boom");
          setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 250);
          clearInterval(laserId);
          const asteroidTakenDown = asteroids.indexOf(currentLaserIndex);
          asteroids.splice(asteroidTakenDown, 1);
          result += 1;
          resultDisplay.textContent = result;
        }
      }
      switch (e.key) {
        case "s":
          laserId = setInterval(moveLaser, 100);
          break;
      }
    }

    function moveAsteroids() {
      for (let i = 0; i < asteroids.length; i++) {
        if (asteroids[i] < 380) {
          squares[asteroids[i]].classList.remove("asteroid");
          asteroids[i] += width;
          squares[asteroids[i]].classList.add("asteroid");
        } else {
          squares[asteroids[i]].classList.remove("asteroid");
          asteroids[i] = asteroids[i] - width * 19;
          squares[asteroids[i]].classList.add("asteroid");
        }
      }
    }

    function gameOver() {
      if (squares[shooterPosition].classList.contains("asteroid")) {
        playing = false;
        alert("Game Over");
        clearInterval(asteroidId);
        clearInterval(laserId);
      }
    }

    function startGame() {
      createBoard();
      putAsteroid();
      createShooter();
      document.addEventListener("keydown", moveShooter);
      document.addEventListener("keydown", shoot);
      asteroidId = setInterval(moveAsteroids, 500);
      setInterval(gameOver, 100);
      if(asteroids.length === 0){
        clearInterval(asteroidId);
        resultDisplay.textContent = 'You Win';
        alert("You Win");
      }
    }
    startGame();


    // Path: main.js