document.addEventListener('keyup', function (event){
    document.location.href = 'arkanoid1.html';
}) 

document.querySelector('audio').addEventListener('ended', function () {
    this.currentTime = 0;
}, false);

