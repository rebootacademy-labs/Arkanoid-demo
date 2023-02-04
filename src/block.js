function Block(width, height, top, left, i, j) {
  this.width = width
  this.height = height
  this.top = top
  this.left = left
  this.i = i;
  this.j = j;
  
  this.draw = function () {
    this.sprite = document.querySelector(`.column${i}-${j}`)
    this.sprite.style.width = this.width + 'px'
    this.sprite.style.height = this.height + 'px'
    this.sprite.style.top = this.top + 'px'
    this.sprite.style.left = this.left + 'px'
  }

  this.delete = function (i, j) {
    const blockToRemove = document.querySelector(`.column${i}-${j}`);
    if (blockToRemove !== null) {
      blockToRemove.parentNode.removeChild(blockToRemove);
    }
  }
}