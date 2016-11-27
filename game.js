var Player = function(x){
    this.health = 100;
    this.height = 50;
    this.width = 50;
    this.x = x; // x position
    this.y = canvas.height - this.height;
    this.shoot = angle => {
        context.fillStyle = 'black';
    }
}
var gravitation = -9.81;
var Bullet = function(x, y, angle, velocity) {
    this.xi = x;
    this.yi = y;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.vx = velocity * Math.cos(this.angle);
    this.vy = velocity * Math.sin(this.angle);
    this.t = 0;
    this.dimension = 5;
    this.draw = () => {
       if(this.y > canvas.height)
          return;
       context.beginPath();
       context.ellipse(this.x, this.y, this.dimension, this.dimension, 0, 0, 2 * Math.PI);
       context.strokeStyle = 'white';
       context.stroke();

       this.x  = this.vx*this.t + this.xi;
       this.y =  this.yi - (this.vy * this.t + 0.5 * gravitation * this.t * this.t);
       this.t += 0.01;
    }
}

var shootBullet = () => {
  angle = document.querySelector('#angle').value *  Math.PI / 180;
  power = document.querySelector('#power').value;
  bullet = new Bullet(player1.x + player1.width + 10,player1.y,angle, power);
}

var between = function(value, leftSide, rightSide) {
  if (value >= leftSide && value <= rightSide)
    return true;
  return false;
}

window.onload = () => {
    window.canvas = document.getElementById('canvas');
    window.context = canvas.getContext('2d');
    document.getElementById('shoot').addEventListener('click', shootBullet);
    // Create players
    window.player1 = new Player(20);
    window.player2 = new Player(canvas.width - 70);

    setInterval(update,1);
}

var update = () => {
   // Clean screen
   context.fillStyle = 'black';
   context.fillRect(0, 0, canvas.width, canvas.height);
   // Draw Player 1
   context.fillStyle = 'red';
   context.fillRect(player1.x, player1.y, player1.width, player1.height);
   // Draw Player2
   context.fillStyle = 'blue';
   context.fillRect(player2.x, player2.y, player2.width, player2.height);
   // Draw Health bar
   context.fillStyle = 'green';
   context.fillRect(player1.x, player1.y - 10, player1.width * player1.health / 100 , 5);
   context.fillRect(player2.x, player2.y - 10, player2.width * player2.health / 100, 5);


   if(window.bullet)
      bullet.draw();
}
