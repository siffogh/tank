var canvas, context;
var player1, player2;
var bullet;
var mouseX, mouseY;
var powerOfArrow, angleOfArrow;
var turn;
var Turn = function() {
  this.numOfPlayers = 2;
  this.currentTurn = 0;
  this.nextTurn = () => {
    this.currentTurn++;
    this.currentTurn %= this.numOfPlayers;
  }
  this.draw = () => {
    context.fillStyle = 'white';
    context.fillText(canvas.width/2, 100);
  }
}
var Player = function(x) {
  this.health = 100;
  this.height = 50;
  this.width = 50;
  this.x = x; // x position
  this.y = canvas.height - this.height;
}
var Arrow = function(x, y) {
  this.fromX = x;
  this.fromY = y;
  this.toX;
  this.toY;
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
  this.radius = 5;
  this.deleted = false;
  this.draw = () => {
      if(this.y > canvas.height) {
        return;
      }
      if (this.collisionDetection()) {
        this.deleted = true;
        return;
      }
      context.beginPath();
      context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
      context.strokeStyle = 'white';
      context.stroke();

      this.x  = this.vx*this.t + this.xi;
      this.y =  this.yi - (this.vy * this.t + 0.5 * gravitation * this.t * this.t);
      this.t += 0.01;
  }
  this.collisionDetection = () => {
    if (turn.currentTurn == 0) {
      if (between(this.x + this.radius, player2.x, player2.x + player2.width)) {
        if (between(this.y + this.radius, player2.y, player2.y + player2.height)) {
          player2.health -= 30;
          return true;
        }
      }
    }
    return false;
  }
}

var shootBullet = () => {
  if (turn.currentTurn == 0) {
    bullet = new Bullet(player1.x + player1.width + 10,player1.y,angleOfArrow, powerOfArrow);
  }
}

var between = function(value, leftSide, rightSide) {
  if (value >= leftSide && value <= rightSide) {
    return true;
  }
  return false;
}

var getMousePosition = function(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = event.clientX - rect.left - root.scrollLeft;
  mouseY = event.clientY - rect.top - root.scrollTop;

  if (mouseX != undefined)
    player1Arrow.toX = mouseX;
  if (mouseY != undefined)
    player1Arrow.toY = mouseY;
}


window.onload = () => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    turn = new Turn();
    // Create players
    player1 = new Player(20);
    player2 = new Player(canvas.width - 50 - 20);

    player1Arrow = new Arrow(player1.x + player1.width, player1.y);

    canvas.addEventListener('mousemove', getMousePosition);
    canvas.addEventListener('click', shootBullet);

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

   getAngleAndPower();
   // Limit the Arrow to 90 degrees and 0 degrees
   arrowLimit();

   if(window.bullet && !bullet.deleted) {
      bullet.draw();

    }
}
var arrowLimit = () => {
  if (angleOfArrow*180/Math.PI >= 90) {
    angleOfArrow = Math.PI / 2;
  }
  else if (angleOfArrow*180/Math.PI <= 0) {
    angleOfArrow = 0;
  }
  else {
    drawArrow(player1Arrow.fromX, player1Arrow.fromY, player1Arrow.toX, player1Arrow.toY, 'red');
  }
}
var getAngleAndPower = () => {
  var dy = player1Arrow.fromY - player1Arrow.toY;
  var dx = player1Arrow.toX - player1Arrow.fromX;
  angleOfArrow = Math.atan2(dy, dx);
  powerOfArrow = Math.sqrt((player1Arrow.toX-player1Arrow.fromX)*(player1Arrow.toX-player1Arrow.fromX) + (player1Arrow.toY-player1Arrow.fromY)*(player1Arrow.toY-player1Arrow.fromY));;
  powerOfArrow /= 2;
}

var drawArrow = function(fromX, fromY, toX, toY, fillColor) {
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toY-fromY,toX-fromX);
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineTo(toX-headlen*Math.cos(angle-Math.PI/6),toY-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(toX, toY);
    context.lineTo(toX-headlen*Math.cos(angle+Math.PI/6),toY-headlen*Math.sin(angle+Math.PI/6));
    context.strokeStyle = fillColor;
    context.stroke();
}
