const game = new Game();
const ball = new Ball();
const platform = new Platform();
const blockCollectionInstance = new BlockCollection(480, 240, 1, 1, 60, 60);
const blockHTML = document.querySelector('.blocks');
blockCollectionInstance.draw();
blockHTML.innerHTML = blockCollectionInstance.generateBlockCollection();
blockCollectionInstance.drawAllBlocks()
const initialText = document.querySelector('.start');

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
    this.location.reload();
  }
})