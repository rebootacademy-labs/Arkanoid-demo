function Platform() {
  this.sprite = document.querySelector(".platform");
  this.direction = 0;
  this.left = 250;
  this.width = 100;
  this.speed = 2.5;
  this.top = 780;

  this.move = function () {
    if (
      (this.direction === -1 && this.left <= this.speed) ||
      (this.direction === 1 && this.left >= 600 - this.width - this.speed)
    )
      this.direction = 0;
    this.left += this.direction * this.speed;
    this.sprite.style.left = this.left + "px";
  };
}