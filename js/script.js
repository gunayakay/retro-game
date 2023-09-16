// Oriented Programing
// 1.Encapsulation = Encapsulation which means we will group data and methods that operate on that data into seperate bundles, into objects.,
// We can also restrict access to that data from outside the bundle using closures,private and so on.
// 2.Abstraction
// 2.Abstraction
// 3.Inheritance
// 4.Polymorphism

// "Object Pool" is a creational desing patern
// It allows us to avoid performance issues related to automatic
// memory allocation and garbage collection process, that trigger
// when we create and destroy large amount of Javascript objects.
// "** Creational Design Patern" provide various object creation mechanism
// which increase flexibility and reuse of existing code

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
    if (this.x < -this.width * 0.5) this.x = this.width * 0.5;
    else if (this.x > this.game.width - this.width * 0.5)
      this.x = this.game.width - this.width * 0.5; // player cant go outsides
  }
  shoot(){
   const projectile=this.game.getProjectile(); 
   if(projectile) projectile.start(this.x + this.width * 0.5 ,this.y) //shoot from center
  }
}
class Projectile {
  constructor() { 
    // to shoot bigger or more
    this.width = 8;
    this.height = 50;
    this.x = 0;
    this.y = 0;
    this.speed = 20;
    this.free = true;
  }
  draw(context) {
    if (!this.free) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  update(context) {
    if (!this.free) {
      this.y -= this.speed;
      if(this.y < 0 - this.height) this.reset()
    }
  }
  
  start(x,y) {
    this.x = x - this.width * 0.5;
    this.y = y;
    this.free = false;
  }
  reset() {
    this.free = true;
  }
}
class Enemy {}
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    this.projectilePool = [];
    this.numberOfProjectile = 10;
    this.createProjectiles();
    console.log(this.projectilePool);

    // event listeners
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key); // indexOf() return the first index at which given element can be found in the array. It returns -1 if the element is not present
      if(e.key === '1' ) this.player.shoot()
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
    this.projectilePool.forEach(projectile => {
      projectile.update();
      projectile.draw(context);
    })
  }
  // create projectile object pool
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectile; i++) {
      this.projectilePool.push(new Projectile());
    }
  }
  // get free projectile object from the pool
  getProjectile(){
    for (let i = 0; i < this.projectilePool.length; i++) {  
      if(this.projectilePool[i].free) return this.projectilePool[i];
  }

}

window.addEventListener("load", function () {
  // "load element" fires when the whole page has loaded including all dependent resources such as stylesheets, scripts, images and so on.
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d"); // ctx from canvas for context
  // we are setting both "element" size and "drawing surface" size
  // "html canvas" has 2 sizes, they need to be set to the same value to prevent distortions
  canvas.width = 600;
  canvas.height = 800;
  const game = new Game(canvas);
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // to clear canvas animate
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
