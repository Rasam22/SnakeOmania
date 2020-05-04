function init() {
    var canvas = document.getElementById('myCanvas');
    W = canvas.width = 1250;
    H = canvas.height = 600;
    pen = canvas.getContext('2d');
    cs = 20;
    csa = 30;
    csimg = 66;
    game_over = false;
    score = 0;


    food_img = new Image();
    food_img.src = "apple.png";

    trophy = new Image();
    trophy.src = "trophy.png";

    food = getRandomFood();

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function() {

            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs, cs);
            }
        },
        updateSnake: function() {

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                console.log("food eaten");
                food = getRandomFood();
                score++;
            } else {
                this.cells.pop();
            }
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            } else {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });


            var last_x = Math.round(W / cs);
            var last_y = Math.round(H / cs);
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y)
                game_over = true;
        }
    };
    snake.createSnake();

    function keyPressed(e) {
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        } else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        } else if (e.key == "ArrowUp") {
            snake.direction = "up";
        } else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
    }
    //add event listener to document object
    document.addEventListener('keydown', keyPressed);
}

function draw() {

    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, csa, csa);

    // pen.drawImage(trophy, 18, 20, csimg, csimg);
    // pen.fillStyle = "blue";
    // pen.font = "28px Roboto"
    // pen.fillText("Score:" + score, 75, 50);
    var sc = document.getElementById("scores");
    sc.innerHTML = "SCORE : " + score;
}

function update() {
    snake.updateSnake();
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop() {
    if (game_over == true) {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);