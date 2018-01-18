$(document).ready(function() {
    var pongTable = document.getElementById("pongTable");
    var pongTableContext = pongTable.getContext("2d");

    // create paddles
    var Paddle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
    };

    Paddle.prototype.render = function() {
        pongTableContext.fillRect(this.x, this.y, this.width, this.height);
    };

    Paddle.prototype.move = function(speed) {
        this.speed = speed;
        this.y += this.speed;
        if (this.y < 0) {
            this.y = 0
        } else if (this.y > 400) {
            this.y = 400
        }
    };

    var Player = function(paddle) {
        this.paddle = paddle;
    };

    Player.prototype.render = function() {
        this.paddle.render()
    };

    var Computer = function(paddle) {
        this.paddle = paddle;
    };

    Computer.prototype.render = function() {
        this.paddle.render()
    };


    // continuously render gameplay
    var animate = window.requestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000/60) };

    // create ball
    var Ball = function() {
        this.x = pongTable.width / 2;
        this.y = pongTable.height / 2;
        this.radius = 5;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.counterClockwise = false;
        this.speed = 4;
        this.speedX = (Math.round(Math.random()) * 2 - 1) * (Math.random() * (this.speed - 3) + 3);
        this.speedY = (Math.round(Math.random()) * 2 - 1) * Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speedX, 2));
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
        new Paddle(830, 200, 10, 80)
    );

    var computer = new Computer(
        new Paddle(10, 200, 10, 80)
    );

    var ball = new Ball();

    function step() {
        pongTableContext.clearRect(0, 0, 850, 475);
        player.render();
        computer.render();
        ball.render();
        animate(step);
    }

    step();

    window.addEventListener('keydown', function(event) {
        if (event.keyCode === 38) {
            player.paddle.move(-35);
        } else if (event.keyCode === 40) {
            player.paddle.move(35);
        }
    });

});
