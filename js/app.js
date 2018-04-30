// ----------------------Enemies---------------------

var Enemy = function(x,y) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*200)+100);
    this.sprite = 'images/enemy-bug.png';
};


//moving enemy position
Enemy.prototype.update = function(dt) {
    'use strict';
    if(this.x <= 505) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};


Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ----------------Player-----------------

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

    //touch enemy
    allEnemies.forEach(function(enemy) {
        if (self.x >= enemy.x - 25 && self.x <= enemy.x + 25) {
            if (self.y >= enemy.y - 25 && self.y <= enemy.y + 25){
                self.reset();
            }
        }
    });
};

Player.prototype.render = function () {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {
    'use strict';
    this.pressedKey = e
}

Player.prototype.reset = function () {
    'use strict';
    this.x = 200;
    this.y = 400;
}

// --------------Instantiate Objects-----------------

var player = new Player();

var allEnemies = [];

function displayEnemies () {
    'use strict';
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
};


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
