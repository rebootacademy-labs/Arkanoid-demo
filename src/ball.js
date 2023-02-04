function Ball() {

  this.speedX = -2;
  this.speedY = -4;
  this.top = 600
  this.height = 25
  this.width = 25
  this.left = 288
  this.sprite = document.querySelector('.ball')
  
  this.collidesWithSomething = function () {
    return this.collidesWithPlatform
      || this.collidesWithLateralWalls
      || this.collidesWithTopWall
      || this.collidesWithBlocks
      || this.collidesWithBottom
  }
  this.collidesWithPlatform = function () { // el top ball + hight ball != top de platform*/
    if (this.top + this.height >= platform.top
      && this.left >= platform.left
      && this.left + this.width <= platform.left + platform.width) {
      this.speedY *= (-1);
    }
  }

  this.collidesWithLateralWalls = function () {
    if (this.left + this.width > 600 || this.left < 0) {
      this.speedX *= (-1);
    }
  }

  this.collidesWithTopWall = function () {
    if (this.top <= 0) {
      this.speedY *= (-1);
    }
  }
  this.collidesWithBlocks = function () {
    if (this.top <= blockCollectionInstance.top + (blockCollectionInstance.top / blockCollectionInstance.rows) + blockCollectionInstance.height // abajo
      && this.left + this.width >= blockCollectionInstance.left // izquierda
      && this.left <= blockCollectionInstance.left + blockCollectionInstance.width // derecha
      && this.top + this.height >= blockCollectionInstance.top) // arriba 
    {
      blockCollectionInstance.removeBlock(this.top, this.left, this.width, this.height)
    }
  }
  this.collidesWithBottom = function () {
    if (this.top + this.height > 800) {
      game.gameOver()
    }
  }

  this.move = function () {
    if (!this.collidesWithPlatform() && !this.collidesWithLateralWalls() && !this.collidesWithTopWall() && !this.collidesWithBlocks() && !this.collidesWithBottom()) {
      this.left += this.speedX;
      this.sprite.style.left = this.left + "px";
      this.top += this.speedY;
      this.sprite.style.top = this.top + "px";
    }
  }
}