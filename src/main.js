//Initializing objects
const game = new Game();
const ball = new Ball();
const platform = new Platform();
const blockCollectionInstance = new BlockCollection(480, 240, 2, 2, 60, 60);

//We fill the blocks div with all the blocks we create
const blockHTML = document.querySelector('.blocks');
blockCollectionInstance.draw();
blockHTML.innerHTML = blockCollectionInstance.generateBlockCollection();
blockCollectionInstance.drawAllBlocks()

// Texts that inform the player (victory, defear, life lost, game start, life and scores)
const initialText = document.querySelector('.start');
const lostLifeText = document.querySelector('.life-lost');
const victoryText = document.querySelector('.victory');
const gameOverText = document.querySelector('.game-over');
const scoreHTML = document.querySelector('.score-text')
const recordTextsHTML = document.querySelectorAll('.record-text')
const livesHTML = document.querySelector('.lives-text')

// We link JS with the audio tags
const blockCollisionAudio = document.querySelector("#blockCollisionAudio")
const gameOverAudio = document.querySelector("#gameOverAudio")
const loseLifeAudio = document.querySelector('#loseLifeAudio');
const victoryAudio = document.querySelector("#victoryAudio")
const boing1 = document.querySelector('#boing1');
const boing2 = document.querySelector('#boing2');

document.addEventListener('keyup', function (event) {
  
  if (game.gameStatus === -1) {
    initialText.style.display = "none"
    lostLifeText.style.display = "none"
    victoryText.style.display = "none"
    gameOverText.style.display = "none"

    game.startGame();
    game.gameStatus = 1
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' && game.gameStatus === 1) {
    platform.direction = null
  }
})

// Firefox compatibility for looping audio
document.getElementById('backgroundAudio').addEventListener('ended', function () {
  console.log("audio finished")
  this.currentTime = 0;
  this.play();
}, false);