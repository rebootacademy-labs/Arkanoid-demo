function Game() {
  this.gameStatus = -1;
  this.timerId;
  this.score = 0;
  this.record = 0; 
  this.lives = 3;

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
    if (this.isNewRecord()) this.record = this.score
    this.updatePanel();
    this.restart();
    this.gameStatus = -1;
    blockCollectionInstance.restart();
    gameOverAudio.play()

  };

  this.gameVictory = function () {
    clearInterval(this.timerId)
    document.querySelector('.victory').style.display = 'block'
    var finalText = document.querySelectorAll(".victory .invisible-text");
    finalText.forEach(e => e.style.display = 'inline')
    this.gameStatus = 0;
    if(this.isNewRecord()) this.record = this.score
    
    this.updatePanel();
    victoryAudio.play();
    scoreHTML.innerText = 0;
  };

  this.gameEngine = function () {
    platform.move()
    ball.move()
  }

  this.restart = function (){
    ball.restartPosition();
    platform.restartPosition();
  }
  this.loseLife = function (){
    if(this.lives === 0) this.gameOver();
    else {
      clearInterval(this.timerId)
      this.restart()
      document.querySelector('.start').style.display = 'block'
      var finalText = document.querySelectorAll(".invisible-text");
      finalText.forEach(e => e.style.display = 'inline')
      this.lives--
      this.gameStatus = -1
      livesHTML.innerText = this.lives
      loseLifeAudio.play();
    }
  }

  this.addPoints = function () {
    this.score += 10;
    scoreHTML.innerText = this.score;
  }

  this.updatePanel = function() {
    this.lives = 3;
    this.score = 0;
    scoreHTML.innerText = this.score;
    recordHTML.innerText = this.record;
    livesHTML.innerText = this.lives;
  }

  this.isNewRecord = function (){
    return this.score > this.record;
  }
}