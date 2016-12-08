var canvas, context;
var player1, player2;
var bullet;
var mouseX, mouseY;
var powerOfArrow, angleOfArrow;
var turn;
var MAX_POWER = 151;
var winCondition = 0;
var shooting = false;
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
	this.height = 30;
	this.width = 30;
  this.x = x; // x position
  this.y = canvas.height - this.height;
}

var getMousePosition = function(event) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = event.clientX - rect.left - root.scrollLeft;
	mouseY = event.clientY - rect.top - root.scrollTop;

	if (mouseX != undefined) {
		player1Arrow.toX = mouseX;
		player2Arrow.toX = mouseX;
	}
	if (mouseY != undefined) {
		player1Arrow.toY = mouseY;
		player2Arrow.toY = mouseY;
	}
}


window.onload = () => {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	context.lineWidth = 2;

	turn = new Turn();
  // Create players
  player1 = new Player(20);
  player2 = new Player(canvas.width - 50 - 20);

  player1Arrow = new Arrow(player1.x + player1.width, player1.y);
  player2Arrow = new Arrow(player2.x, player2.y);

  canvas.addEventListener('mousemove', getMousePosition);
  canvas.addEventListener('click', function(event) {
  	if (!arrowLimit()) {
  		shootBullet();
  	}
  });
  canvas.addEventListener('mousedown', function(event) {
  	if (winCondition != 0) {
  		winCondition = 0;
  		player1.health = 100;
  		player2.health = 100;
  	}
  });

  var msgInput = document.querySelector('#msg');
  document.querySelector('#submit').addEventListener('click', () => window.msg = msgInput.value);
  window.msg = '';

  setInterval(update,1);
}

var update = () => {
  // Clean screen
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (winCondition === 1) {
  	context.fillStyle = 'red';
  	context.fillText("Player 1 Wins", 400,200);
		context.fillStyle = 'white';
		context.fillText("CLick to continue...", 400,400);
  	return;
  }
  if (winCondition === 2) {
  	context.fillStyle = 'blue';
  	context.fillText("Player 2 Wins", 400,200);
		context.fillStyle = 'white';
		context.fillText("CLick to continue...", 400,400);
  	return;
  }
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
  // Draw msg
  if(window.msg.length > 0) {
  	drawMessage(player1,window.msg);
  }

	context.save();
	context.font = '26px Hack';
	if (turn.currentTurn % 2 === 0) {
		context.fillStyle = 'red';
		context.fillText('Turn: Player 1', canvas.width/2 - 100, 100);
	}
	else {
		context.fillStyle = 'blue';
		context.fillText('Turn: Player 2', canvas.width/2 - 100, 100);
	}

	context.restore();

  getAngleAndPower();
  // Limit the Arrow to 90 degrees and 0 degrees
  if (!arrowLimit()) {
  	if (turn.currentTurn % 2 === 0) {
  		drawArrow(player1Arrow.fromX, player1Arrow.fromY, player1Arrow.toX, player1Arrow.toY, 'red');
  	}
  	else {
  		drawArrow(player2Arrow.fromX, player2Arrow.fromY, player2Arrow.toX, player2Arrow.toY, 'blue');
  	}
  	// Draw Power and angle at mouse position
  	context.fillStyle = 'white';
  	if (turn.currentTurn % 2 === 0) {
	  	context.fillText("Power: " + Math.floor(powerOfArrow)
	  	 	+ ", Angle: " + Math.floor(angleOfArrow*180/Math.PI),
	  	 	 mouseX + 15, mouseY - 15);
  	}
  	else {
  		context.fillText("Power: " + Math.floor(powerOfArrow)
	  	 	+ ", Angle: " + Math.floor(180 - angleOfArrow*180/Math.PI),
	  	 	 mouseX + 15, mouseY - 15);
  	}
  }

  if(window.bullet && !bullet.deleted) {
  	bullet.draw();
  }
}



var drawMessage = (player, msg) => {
	context.fillStyle = 'yellow';
	context.fillText(msg, player.x, player.y - 30);
}
