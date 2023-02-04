function Block(width, height, top, left, i, j) {

  let self = this
  this.width = width
  this.height = height
  this.top = top
  this.left = left
  this.i = i;
  this.j = j;
  this.draw = function () {
    this.sprite = document.querySelector(`.column${i}${j}`)
    self.sprite.style.width = self.width + 'px'
    self.sprite.style.height = self.height + 'px'
    self.sprite.style.top = self.top + 'px'
    self.sprite.style.left = self.left + 'px'
  }
  this.delete = function (i, j) {
    const blockToRemove = document.querySelector(`.column${i}${j}`);
    if (blockToRemove !== null) {
      blockToRemove.parentNode.removeChild(blockToRemove);
    }
  }
}