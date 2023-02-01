const initialText = document.querySelector('.start');
document.addEventListener('keyup', function(event){
    if (event.key === "g") initialText.parentNode.removeChild(initialText);
    startGame();
})

function startGame(){
    
    const platform = document.querySelector('.platform');
    document.addEventListener('keydown', function(event){
        console.log(platform.style.left)
        if (event.key === 'ArrowRight'){
            let left = platform.style.left;
            left = parseInt(left.substring(0,left.indexOf('p')))
            left += 50;
            platform.style.left = left + "px";
        }
        if(event.key === 'ArrowLeft'){

        }
    })
}