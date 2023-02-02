const initialText = document.querySelector('.start');
let pos = 235
var gameStarted = false
document.addEventListener('keyup', function (event) {
  if (event.key === "g") initialText.parentNode.removeChild(initialText);
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    platform.direction = null
  }
  if (!gameStarted) {
    startGame();
    gameStarted = true
  }


})

function startGame() {


  document.addEventListener('keydown', function (event) {

    if (event.key === 'ArrowRight') {
      platform.direction = 1
    }

    if (event.key === 'ArrowLeft') {
      platform.direction = -1
    }
  })

  const timerId = setInterval(gameEngine, 50)

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
  this.speed = 24
  this.top = 770

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

  this.speedX = 10;
  this.speedY = -15;
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
    if (this.left + this.width >= 600 || this.left <= 0) {
      this.speedX *= (-1);
    }
  }

  this.collidesWithTopWall = function () {
    if (this.top <= 0) {
      this.speedY *= (-1);
    }
  }



  this.move = function () {
    if (!this.collidesWithPlatform() && !this.collidesWithLateralWalls() && !this.collidesWithTopWall()) {
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
  //this.sprite.style.width = this.width + 'px'
  //this.sprite.style.height = this.height + 'px'
  this.top = top
  this.left = left
  this.draw = function (){
    this.sprite = document.querySelector(`.column${i}${j}`)
    self.sprite.style.width  = self.width + 'px'
    self.sprite.style.height = self.height + 'px'
    self.sprite.style.top    = self.top + 'px'
    self.sprite.style.left   = self.left + 'px'
  }
 
  //self.sprite.style.width = "300px"
  //self.sprite.style.height = "300px"
}

function BlockColletion(width, height, rows, columns, left, top) {

  this.blocks    = []
  this.width     = width
  this.height    = height
  this.top       = top
  this.left      = left
  this.sprite    = document.querySelector(".blocks")
  this.sprite.style.top = this.top + "px";
  this.sprite.style.left = this.left + "px";
  this.rows      = rows
  this.columns   = columns

  this.generateBlockColletion = function () {

    let stringResult = '';

    for (var i = 0; i < this.rows; i++) {
      stringResult += `<div class="row${i}">`;
      for (var j = 0; j < this.columns; j++) {
        stringResult += `<div class="col column${i}${j}"></div>`;
        let blockToInsert = 
          new Block(this.width / this.columns, 
          this.height / this.rows, 
          this.top + (this.height / this.rows)*i,
          this.left + (this.width / this.columns)*j,
          i,
          j
        )
        this.blocks.push(blockToInsert)
      }
      stringResult += '</div>' 
    }
    return stringResult;
  }
  this.drawAllBlocks = function () {
    this.blocks.forEach (function (block) {block.draw()})
  }
}

const blockCollectionInstance = new BlockColletion(480, 240, 6, 3, 60, 60);
const blockHTML = document.querySelector('.blocks');
console.log(blockCollectionInstance.generateBlockColletion())
blockHTML.innerHTML = blockCollectionInstance.generateBlockColletion();
blockCollectionInstance.drawAllBlocks()