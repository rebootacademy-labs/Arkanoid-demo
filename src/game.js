function Game() {
  this.gameStatus = -1;
  this.timerId;

  this.startGame = function () {
    document.addEventListener('keydown', function (event) {
      
      if (event.key === 'ArrowRight') {
        platform.direction = 1
      }
  
      if (event.key === 'ArrowLeft') {
        platform.direction = -1
      }
      
    })
    this.timerId = setInterval(this.gameEngine,7 )
  };

  this.gameOver = function () {
    clearInterval(this.timerId);
    document.querySelector('.start').style.display = 'block'
    var finalText = document.querySelectorAll(".invisible-text");
    finalText.forEach(e => e.style.display = 'inline')
    this.gameStatus = 0;
  };

  this.gameVictory = function () {
    clearInterval(this.timerId)
    document.querySelector('.victory').style.display = 'block'
    var finalText = document.querySelectorAll(".victory .invisible-text");
    finalText.forEach(e => e.style.display = 'inline')
    this.gameStatus = 0;
  };

  this.gameEngine = function () {
    platform.move()
    ball.move()
  }
}
