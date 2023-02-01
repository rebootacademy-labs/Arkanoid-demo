const initialText = document.querySelector('.start');
let pos = 235
var gameStarted = false 
document.addEventListener('keyup', function(event){
    if (event.key === "g") initialText.parentNode.removeChild(initialText);
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        platform.direction = null
    }
    if (!gameStarted){
        startGame();
        gameStarted = true
    }
    
    
})

function startGame(){
    
    
    document.addEventListener('keydown', function(event){

        if (event.key === 'ArrowRight'){
            platform.direction = 1
        }

        if(event.key === 'ArrowLeft'){ 
            platform.direction = -1
        }
    })

    const timerId = setInterval(gameEngine, 50)
    
}

function gameEngine () {
    platform.move()
    ball.move()
}

function Platform (){
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

function Ball () {
    
    this.speedX = 0 
    this.speedY = 10;
    this.top = 600
    this.height = 25
    this.width = 25
    this.left = 288
    this.sprite = document.querySelector('.ball')
    this.collision
    this.collidesWithSomething = function (){
        return this.collidesWithPlatform || this.collidesWithWalls ||
        this.collidesWithBlocks || this.collidesWithBottom
    }
    this.collidesWithPlatform = function () { // el top ball + hight ball != top de platform*/
        if (this.top + this.height >= platform.top 
            && this.left >= platform.left 
            && this.left + this.width <= platform.left + platform.width){
                
                return true
            }return false

    }
    this.move = function (){
        if(!this.collidesWithPlatform()){ 
        
            this.top += this.speedY;
            this.sprite.style.top = this.top + "px";
        }
    }
}

const ball = new Ball();