var Arrow = function(x, y) {
	this.fromX = x;
	this.fromY = y;
	this.toX;
	this.toY;
}

var arrowLimit = () => {
	if (powerOfArrow > MAX_POWER) {
		return true;
	}

	if (turn.currentTurn % 2 === 0) {
		if (angleOfArrow*180/Math.PI >= 90) {
			angleOfArrow = Math.PI / 2;
			return true;
		}
		else if (angleOfArrow*180/Math.PI <= 0) {
			angleOfArrow = 0;
			return true;
		}
	}
	else {
		if (angleOfArrow*180/Math.PI < -90) {
			angleOfArrow = Math.PI;
			return true;
		}
		else if (angleOfArrow*180/Math.PI < 90) {
			angleOfArrow = Math.PI / 2;
			return true;
		}
	}
	return false;
}

var getAngleAndPower = () => {
	var dy, dx;
	if (turn.currentTurn % 2 === 0) {
		dy = player1Arrow.fromY - player1Arrow.toY;
		dx = player1Arrow.toX - player1Arrow.fromX;
		powerOfArrow = Math.sqrt((player1Arrow.toX-player1Arrow.fromX)*(player1Arrow.toX-player1Arrow.fromX)
							   + (player1Arrow.toY-player1Arrow.fromY)*(player1Arrow.toY-player1Arrow.fromY));

	}
	else {
		dy = player2Arrow.fromY - player2Arrow.toY;
		dx = player2Arrow.toX - player2Arrow.fromX;
		powerOfArrow = Math.sqrt((player2Arrow.toX-player2Arrow.fromX)*(player2Arrow.toX-player2Arrow.fromX)
							   + (player2Arrow.toY-player2Arrow.fromY)*(player2Arrow.toY-player2Arrow.fromY));

	}
	angleOfArrow = Math.atan2(dy, dx);
	powerOfArrow /= 3;
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
