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
		if (this.collisionDetection()) {
			this.deleted = true;
			shooting = false;
			turn.nextTurn();
			this.blowUp();
			return;
		}
		context.beginPath();
		context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
		context.strokeStyle = 'yellow';
		context.stroke();

		this.x  = this.vx*this.t + this.xi;
		this.y =  this.yi - (this.vy * this.t + 0.5 * gravitation * this.t * this.t);
		this.t += 0.02;
	}
	this.collisionDetection = () => {
		if(this.y > canvas.height) {
			return true;
		}
		if (this.x <= 0) {
			return true;
		}
		if (this.x >= canvas.width) {
			return true;
		}
		if (turn.currentTurn == 0) {
			if (between(this.x + this.radius, player2.x, player2.x + player2.width)) {
				if (between(this.y + this.radius, player2.y, player2.y + player2.height)) {
					player2.health -= 25;
					if (player2.health <= 0) {
						player2.health = 0;
						winCondition = 1;
					}
					return true;
				}
			}
		}
		if (turn.currentTurn == 1) {
			if (between(this.x + this.radius, player1.x, player1.x + player1.width)) {
				if (between(this.y + this.radius, player1.y, player1.y + player1.height)) {
					player1.health -= 25;
					if (player1.health <= 0) {
						player1.health = 0;
						winCondition = 2;
					}
					return true;
				}
			}
		}
		return false;
	}
	this.blowUp = () => {
		// BUG
		// Draws for only 1 frame
		// Draw a black circle
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(this.x, this.y, this.radius + 5, 0, Math.PI*2);
		context.fill();

	}
}


var shootBullet = () => {
	if (shooting) {return;}

	if (turn.currentTurn == 0) {
		bullet = new Bullet(player1.x + player1.width + 10,player1.y, angleOfArrow, powerOfArrow);
		shooting = true;
	}
	else {
		bullet = new Bullet(player2.x - 10,player2.y, angleOfArrow, powerOfArrow);
		shooting = true;
	}
}

var between = function(value, leftSide, rightSide) {
	if (value >= leftSide && value <= rightSide) {
		return true;
	}
	return false;
}
      
