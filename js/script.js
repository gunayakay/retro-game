// Oriented Programing
// 1.Encapsulation = Encapsulation which means we will group data and methods that operate on that data into seperate bundles, into objects.,
// We can also restrict access to that data from outside the bundle using closures,private and so on.
// 2.Abstraction
// 2.Abstraction
// 3.Inheritance
// 4.Polymorphism
//

class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.speed = 10;
  }
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    // horizontal movements
    if (this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed;
    if (this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed;
    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width; // player cant go outside
  }
}
class Projectile {}
class Enemy {}
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    // event listeners
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key); // indexOf() return the first index at which given element can be found in the array. It returns -1 if the element is not present
      console.log(this.keys);
    });

    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1); // splice() method can be used to replace or remove existing elements from an array
      console.log(this.keys);
    });
  }
  render(context) {
    this.player.draw(context);
    this.player.update();
  }
}

window.addEventListener("load", function () {
  // "load element" fires when the whole page has loaded including all dependent resources such as stylesheets, scripts, images and so on.
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d"); // ctx from canvas for context
  // we are setting both "element" size and "drawing surface" size
  // "html canvas" has 2 sizes, they need to be set to the same value to prevent distortions
  canvas.width = 500;
  canvas.height = 700;
  const game = new Game(canvas);
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // to clear canvas animate
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
