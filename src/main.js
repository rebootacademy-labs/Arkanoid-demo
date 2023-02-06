const game = new Game();
const ball = new Ball();
const platform = new Platform();
const blockCollectionInstance = new BlockCollection(480, 240, 15, 35, 60, 60);
const blockHTML = document.querySelector('.blocks');
blockCollectionInstance.draw();
blockHTML.innerHTML = blockCollectionInstance.generateBlockCollection();
blockCollectionInstance.drawAllBlocks()
const initialText = document.querySelector('.start');
const blockCollisionAudio = document.querySelector("#blockCollisionAudio")
const gameOverAudio = document.querySelector("#gameOverAudio")
const loseLifeAudio = document.querySelector('#loseLifeAudio');
const victoryAudio = document.querySelector("#victoryAudio")
const scoreHTML = document.querySelector('.score-text')
const recordHTML = document.querySelector('.record-text')
const livesHTML = document.querySelector('.lives-text')
const boing1 = document.querySelector('#boing1');
const boing2 = document.querySelector('#boing2');

document.addEventListener('keyup', function (event) {
  initialText.style.display = "none"
  if (game.gameStatus === -1) {
    game.startGame();
    game.gameStatus = 1
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' && game.gameStatus === 1) {
    platform.direction = null
  }
  if (game.gameStatus === 0) {
    /*this.location.reload();*/

  }
})