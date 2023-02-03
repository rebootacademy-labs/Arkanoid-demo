
var timerId 
const initialText = document.querySelector('.start');
let pos = 235
var gameStarted = false
document.addEventListener('keyup', function (event) {
  if (event.key === "g") {
  //  initialText.parentNode.removeChild(initialText);
  initialText.style.display = "none" 
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    platform.direction = null
  }
  if (!gameStarted) {
    startGame();
    gameStarted = true
  }


})

function gameOver (){

  clearInterval(timerId);
  console.log("Se acabó ")
  initialText.style.display = 'block'
  var finalText = document.querySelector(".game-over-text");
  finalText.style.display = 'block'
}


function startGame() {


  document.addEventListener('keydown', function (event) {

    if (event.key === 'ArrowRight') {
      platform.direction = 1
    }

    if (event.key === 'ArrowLeft') {
      platform.direction = -1
    }
  })

  timerId = setInterval(gameEngine, 10)

}

function gameEngine() {
  platform.move()
  ball.move()
}

function Platform() {
  var self = this
  this.sprite = document.querySelector('.platform');
  this.direction = 0
  this.left = 250
  this.width = 100
  this.speed = 5.8
  this.top = 780

  this.move = function () {

    if (this.direction === -1 && this.left <= this.speed
      || this.direction ===
      1 && this.left >= 600 - this.width - this.speed)
      this.direction = 0;

    this.left += this.direction * this.speed
    this.sprite.style.left = this.left + 'px'


  }
}

const platform = new Platform()

function Ball() {

  this.speedX = -2;
  this.speedY = -4;
  this.top = 600
  this.height = 25
  this.width = 25
  this.left = 288
  this.sprite = document.querySelector('.ball')
  this.collision
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
    if (this.top <= blockCollectionInstance.top + (blockCollectionInstance.top/blockCollectionInstance.rows) + blockCollectionInstance.height // abajo
      && this.left + this.width >= blockCollectionInstance.left // izquierda
      && this.left <= blockCollectionInstance.left + blockCollectionInstance.width // derecha
      && this.top + this.height >= blockCollectionInstance.top) // arriba 
    {
      //this.speedX *= (-1)
      //this.speedY *= (-1)
      //document.querySelector('.row0').parentNode.removeChild(document.querySelector('.row0'))
      blockCollectionInstance.removeBlock(this.top, this.left, this.width, this.height)
      
    }
  }
  this.collidesWithBottom = function () {
    if(this.top + this.height > 800) {
      gameOver()
    }
  }

  /*this.collidesWithTopOrBotBlock = function (){
    if ((this.top <= b
      lockCollectionInstance.top + blockCollectionInstance.height 
      || this.top + this.height <= blockCollectionInstance.top)
    &&  (this.left + this.width >= blockCollectionInstance.left
    &&  this.left <= blockCollectionInstance.left + blockCollectionInstance.width))
      this.speedX *= (-1)
      this.speedY *= (-1)
  }*/


  this.move = function () {
    if (!this.collidesWithPlatform() && !this.collidesWithLateralWalls() && !this.collidesWithTopWall() && !this.collidesWithBlocks() && !this.collidesWithBottom()) {
      this.left += this.speedX;
      this.sprite.style.left = this.left + "px";
      this.top += this.speedY;
      this.sprite.style.top = this.top + "px";
    }
  }
}

const ball = new Ball();


function Block(width, height, top, left, i, j) {
  
  let self = this
  this.width = width
  this.height = height
  this.top = top
  this.left = left
  this.i = i;
  this.j = j;
  this.draw = function (){
    this.sprite = document.querySelector(`.column${i}${j}`)
    self.sprite.style.width  = self.width + 'px'
    self.sprite.style.height = self.height + 'px'
    self.sprite.style.top    = self.top + 'px'
    self.sprite.style.left   = self.left + 'px'
  }
  this.delete = function (i, j) {
    const blockToRemove = document.querySelector(`.column${i}${j}`);
    if (blockToRemove !== null){
      blockToRemove.parentNode.removeChild(blockToRemove);
    } 
  }
}

function BlockCollection(width, height, rows, columns, left, top) {

  this.blocks    = []
  this.width     = width
  this.height    = height
  this.top       = top
  this.left      = left
  this.rows      = rows
  this.columns   = columns
  this.draw      = function () {
    this.sprite = document.querySelector(".blocks")
    this.sprite.style.top = this.top + "px";
    this.sprite.style.left = this.left + "px";
    this.sprite.style.width = this.width + "px";
    this.sprite.style.height = this.height + "px";
  }

  this.generateBlockCollection = function () {

    let stringResult = '';

    for (var i = 0; i < this.rows; i++) {
     // stringResult += `<div class="row${i}">`;
      for (var j = 0; j < this.columns; j++) {
        stringResult += `<div class="col column${i}${j}"></div>`;
        let blockToInsert = 
          new Block(this.width / this.columns, 
          this.height / this.rows, 
          (this.height / this.rows)*i,
          (this.width / this.columns)*j,
          i,
          j
        )
        this.blocks.push(blockToInsert)
      }
      //stringResult += '</div>' 
    }
    return stringResult;
  }
  this.drawAllBlocks = function () {
    this.blocks.forEach (function (block) {block.draw()})
  }
  this.removeBlock = function (ballTop, ballLeft, ballWidth, ballHeight) {

    for ( let i=0; i<this.blocks.length; i++){

      if (ballTop <= this.blocks[i].top + this.blocks[i].height + this.top // abajo
        && ballLeft + ballWidth >= this.blocks[i].left + this.left // izquierda
        && ballLeft <= this.blocks[i].left + this.blocks[i].width + this.left // derecha
        && ballTop + ballHeight >= this.blocks[i].top + this.top) // arriba
      { 
        console.log(this.blocks[i])
        this.blocks[i].delete(this.blocks[i].i, this.blocks[i].j); 
        this.blocks.splice(i,1)
        ball.speedX *= -1
        ball.speedY *= -1
        console.log(this.blocks)
        break
      } else{
        console.log("no he eliminado nada")
      }
    }
      
    }
  }


const blockCollectionInstance = new BlockCollection(480, 240, 5, 5, 100, 100);

//const blockCollectionInstance = new BlockCollection(120, 120, 1, 1, 200, 120);
const blockHTML = document.querySelector('.blocks');
blockCollectionInstance.draw();
blockHTML.innerHTML = blockCollectionInstance.generateBlockCollection();
blockCollectionInstance.drawAllBlocks()