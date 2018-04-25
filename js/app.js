// ----------------------Enemies---------------------

var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >=this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    this.checkCollision
};

var speedMultiplier = 40


Enemy.prototype.randomSpeed = function () {
    this.speed = speedMultiplier * Math.floor(Math.random()*10 +1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 60, height: 70};
    if (playerBox.x <enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.y + playerBox.height > enemyBox.y) {
        this.collisionDetected();
    }
};

Enemy.prototype.collisionDetected = function () {
    player.characterReset();
}


// ----------------Player-----------------

var Player = function () {
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.characterReset = function () {
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y - this.startingY;
};

Player.prototype.success = function () {
    this.characterReset();
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
    switch (allowedKeys) {
        case "left":
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":
            if (this.y < 0) {
                this.success();
            } else{
                this.y -= 83;
            }
            break;
        case "down":
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};

// --------------Instantiate Objects-----------------

var player = new Player();

var allEnemies = [];

for (var i = 0; i < 3; i++) {
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-100, 60+ (85 * i), startSpeed));
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
