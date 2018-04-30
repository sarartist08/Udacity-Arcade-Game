// ----------------------Enemies---------------------

//enemy set up
var Enemy = function(x,y,speed) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


//moving enemy position
Enemy.prototype.update = function(dt) {
    'use strict';
    this.x = this.x + this.speed * dt;
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
};

//since used again it is outside the function
var speedMultiplier = 40

//sets random movement speed for enemies
Enemy.prototype.randomSpeed = function () {
    'use strict';
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

//enemy on screen
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ----------------Player-----------------

//player set up
var Player = function () {
    'use strict';
    this.x = 200
    this.y = 400
    this.sprite = 'images/char-cat-girl.png';
};

//moving player position
Player.prototype.update = function(dt) {
    'use strict';

    let self = this;

    //if not on edge move left
    if(this.pressedKey === 'left' && this.x > 0) {
        this.x -= 100;
    }

    //if not on edge move right
    if (this.pressedKey === 'right' && this.x < 400) {
        this.x += 100;
    }

    // move up
    if (this.pressedKey === 'up' && this.y > 0) {
        this.y -= 90
    }

    //if not at bottom move down
    if (this.pressedKey === 'down' && this.y < 400) {
        this.y += 90
    }

    this.pressedKey = null;

    //if player reachs water successfully, position reset
    if (this.y < 0) {
        this.reset();
    }

    //enemy collision
    allEnemies.forEach(function(enemy) {
        if (self.x >= enemy.x - 25 && self.x <= enemy.x + 25) {
            if (self.y >= enemy.y - 25 && self.y <= enemy.y + 25){
                self.reset();
            }
        }
    });
};

//player on screen
Player.prototype.render = function () {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//makes arrow keys work for player
Player.prototype.handleInput = function (e) {
    'use strict';
    this.pressedKey = e
}

//if collision or success reset
Player.prototype.reset = function () {
    'use strict';
    this.x = 200;
    this.y = 400;
}

// --------------Instantiate Objects-----------------

//instantiate player
var player = new Player();

//empty enemies array
var allEnemies = [];

//instantiate enemies into array
for (var i =0; i < 3; i++) {
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-100, 60+ (85 * i), startSpeed));
}

//arrow key press EventListener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
