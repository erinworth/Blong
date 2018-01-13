$(document).ready(function() {
  var pongTable = document.getElementById("pongTable");
  var pongTableContext = pongTable.getContext("2d");

  // Create Paddles
  var Paddle = function (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Paddle.prototype.render = function() {
    pongTableContext.fillRect(this.x, this.y, this.width, this.height);
  };

  var Player = function(paddle){
    this.paddle = paddle;
  };

  Player.prototype.render = function() {
    this.paddle.render()
  };

  var Computer = function(paddle){
    this.paddle = paddle;
  }

  Computer.prototype.render = function() {
    this.paddle.render()
  };

  //Create ball
  var Ball = function() {
    this.x = pongTable.width / 2;
    this.y = pongTable.height / 2;
    this.radius = 5;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.counterClockwise = false;
};

Ball.prototype.render = function () {
    pongTableContext.beginPath();
    pongTableContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
    pongTableContext.lineWidth = 10;
    pongTableContext.strokeStyle = 'black';
    pongTableContext.stroke();
    pongTableContext.closePath();
};

// Construct the three elements by creating new objects from the constructors: player,  computer, and ball

var player = new Player(
    new Paddle(600, 200, 10, 80)
);

var computer = new Computer(
    new Paddle(10, 200, 10, 80)
);

var ball = new Ball();

player.render();
computer.render();
ball.render();
});
