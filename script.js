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
}

function Platform (){
    var self = this
    this.sprite = document.querySelector('.platform');
    this.direction = 0
    this.left = 250
    this.width = 100
    this.speed = 24
    
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

funtion Ball ()