function Ball() {
  this.speedX = 0;
  this.speedY = -2;
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
      && this.left <= platform.left + platform.width
      && this.left + this.width >= platform.left) {
      //this.sprite.style.boxShadow = '-5px 5px rgba(116, 197, 215, 0.5), -8px 8px rgba(134, 201, 215,0.4), -10px 10px rgba(150, 206, 217, 0.3)'
      this.speedY *= (-1);
      this.top -= 1;
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
      
      let blockRemoved = blockCollectionInstance.removeBlock(this.top, this.left, this.width, this.height)
      console.log(blockRemoved)
      if(blockRemoved !== undefined){
        console.log("estoy dentro")
        //Tocó por abajo
        if(this.top <= blockRemoved.top + (blockCollectionInstance.top / blockCollectionInstance.rows) + blockCollectionInstance.height  //abajo
        ) //derecha
        {
          this.speedY *= (-1)
          this.top += 1;
          console.log("choco por abajo")
        }
        //Tocó por la derecha
        else if(this.top <= blockRemoved.top + (blockCollectionInstance.top / blockCollectionInstance.rows) + blockCollectionInstance.height //abajo
        && this.left <= blockRemoved.left + blockRemoved.width //derecha 
        && this.top <= blockRemoved.top + (blockCollectionInstance.top /blockCollectionInstance.rows) + blockCollectionInstance.height) //arriba
        {
          this.speedX *= (-1);
          this.left += 1;
          console.log("choco por la derecha")
        }
        //Tocó por la izquierda
        else if(this.top <= blockRemoved.top + (blockCollectionInstance.top / blockCollectionInstance.rows) + blockCollectionInstance.height //abajo
        && this.top <= blockRemoved.top + (blockCollectionInstance.top /blockCollectionInstance.rows) + blockCollectionInstance.height //arriba
        && this.left + this.width >= blockRemoved.left  //izquierda
        ){
          this.speedX *= (-1);
          this.left -= 1;
          console.log("choco por la izquierda")
        }
        
         //Tocó por arriba
        else if(this.top <= blockRemoved.top + (blockCollectionInstance.top /blockCollectionInstance.rows) + blockCollectionInstance.height //arriba
        && this.left + this.width >= blockRemoved.left  //izquierda
        && this.left <= blockRemoved.left + blockRemoved.width //derecha 
        ){
          this.speedY *= (-1);
          this.top -= 1;
          console.log("choco por arriba")
        } 
      }
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