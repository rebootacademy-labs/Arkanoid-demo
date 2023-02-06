document.addEventListener('keyup', function (event){
    setTimeout(function () {
        document.location.href = 'arkanoid1.html';
    }, 3900)
    document.querySelector('.screen').classList.add('animate-screen');
    
    setTimeout(function (){
        document.getElementById('text-to-hide').style.opacity = "0"
    }, 500)
}) 


document.querySelector('audio').addEventListener('ended', function () {
    this.currentTime = 0;
}, false);

