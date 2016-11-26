var Player = function(x, height, width){
    this.x = x; // x position
    this.y = canvas.height - height;
    this.height = height;
    this.width = width;
    this.shoot = angle => {
        context.fillStyle = 'black';

    }
}

var gravitation = -9.81;


var Bullet = function(x, y, a,v) {
    this.xi = x;
    this.yi = y;
    this.x = x;
    this.y = y;
    this.angle = a;
    this.velocity = v;
    this.vx = this.velocity * Math.cos(this.angle);
    this.vy = this.velocity * Math.sin(this.angle);
    this.dimension = 5;
    this.t = 0;

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



window.onload = () => {
    window.canvas = document.getElementById('canvas');
    window.context = canvas.getContext('2d');
    document.getElementById('shoot').addEventListener('click', shootBullet);

    // Create player
    window.player1 = new Player(20, 50, 50);

    setInterval(update,1);
}


var update = () => {
   // Clean screen
   context.fillStyle = 'black';
   context.fillRect(0, 0, canvas.height, canvas.width);

   // Draw Player 1
   context.fillStyle = 'red';
   context.fillRect(player1.x, player1.y, player1.height, player1.width);

   if(window.bullet)
      bullet.draw();

}
