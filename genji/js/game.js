const INTERVAL = 500,
    BTNS = document.querySelectorAll('.btns .btn'),
    TEXT = document.querySelector('.text'),
    SPEED = document.querySelector('.speed');

function startGame() {
    let genji = {},
        start = Date.now();
        
    function Hero() {
        this.name = 'Genji (green cyborg ninja-dude)';
        this.health = 100;
        this.satiety = 100;
        this.happy = 100;
        this.peppiness = 100;
        this.speed = 1;
    
        this.toString = function() {
            return this.name;
        };
    
        this.checkValues = function() {
            if (this.health < 0) this.health = 0;
            if (this.satiety < 0) this.satiety = 0;
            if (this.happy < 0) this.happy = 0;
            if (this.peppiness < 0) this.peppiness = 0;
            if (this.health > 100) this.health = 100;
            if (this.satiety > 100) this.satiety = 100;
            if (this.happy > 100) this.happy = 100;
            if (this.peppiness > 100) this.peppiness = 100;
    
            if (this.health < 60) {
                TEXT.innerHTML = 'I need healing!'
            } else if (this.peppiness < 60) {
                TEXT.innerHTML = 'I got tired.';
            } else if (this.satiety < 60) {
                TEXT.innerHTML = 'I need to eat.';
            } else if (this.happy < 60) {
                TEXT.innerHTML = 'Time to "Ryuujin no ken wo kurae"!';
            }
    
            if (this.health < 15) {
                TEXT.innerHTML = 'I need healing!'
            } else if (this.peppiness < 15) {
                TEXT.innerHTML = 'I got tired.';
            } else if (this.satiety < 15) {
                TEXT.innerHTML = 'I need to eat.';
            } else if (this.happy < 15) {
                TEXT.innerHTML = 'Time to "Ryuujin no ken wo kurae"!';
            }
        };

        this.wishes = function() {
            let temp = 0;
            !this.satiety ? temp++ : '';
            !this.happy ? temp++ : '';
            !this.peppiness ? temp++ : '';
            
            return temp;
         };

        this.defendSpeed = function() {
            this.speed = 1 + this.wishes();
            if (this.wishes() === 3) {
                SPEED.innerHTML = 'Speed of decrease = 33';
            } else {
                SPEED.innerHTML = 'Speed of decrease = ' + this.speed;
            }

            return this.speed;
        };
        
        this.draw = function() {
            let filter = 100 - this.health;
            document.querySelector('#health').style.height = this.health + '%';
            document.querySelector('#satiety').style.height = this.satiety + '%';
            document.querySelector('#happy').style.height = this.happy + '%';
            document.querySelector('#peppiness').style.height = this.peppiness + '%';
            document.querySelector('img').style.filter = 'grayscale(' + filter + '%)';
            
            return this.health;
        };

        this.postProcess = function() {
            this.checkValues();
            this.draw();
            this.defendSpeed();
            
            return this.health;
        };

        this.reduce = function() {
            this.defendSpeed();

            if (this.wishes() === 3) {
                this.health -= 1 * 33;
            } else {
                this.health -= 1 * this.speed;
            }
            this.satiety -= 3 * this.speed;
            this.happy -= 2 * this.speed;
            this.peppiness -= 1 * this.speed;
            
            this.postProcess();
    
            return this.health;
        };
    
        this.heal = function() {
            this.health += 25;
            this.happy += 1;
    
            this.postProcess();
            
            TEXT.innerHTML = 'Thanks Angela.';
            
            return this.health;
        };
    
        this.eat = function() {
            this.health += 1;
            this.satiety += 33;
            this.happy += 1;
            this.peppiness -= 3 * this.speed ;
    
            this.postProcess();
            
            TEXT.innerHTML = 'Much better!';
            
            return this.health;
        };
    
        this.play = function() {
            this.happy += 40;
            this.satiety -= 12 * this.speed ;
            this.health -= 5 * this.speed ;
            this.peppiness -= 10 * this.speed ;
            
            this.postProcess();
            
            TEXT.innerHTML = 'Mada mada!';
    
            return this.health;
        };
    
        this.sleep = function() {
            this.health += 1;
            this.satiety -= 6 * this.speed ;
            this.happy += 7;
            this.peppiness += 40;
            
            this.postProcess();
            
            TEXT.innerHTML = 'Zzz...';
    
            return this.health;
        };
    }
    
    genji = new Hero();
    TEXT.innerHTML  = 'Hi! My name is ' + genji;
    
    let timerId = setInterval(function() {
        if (genji.health <= 0) {
            clearInterval(timerId);
            genji.satiety = 0;
            genji.happy = 0;
            genji.peppiness = 0;
            genji.draw();
            let diff = (Date.now() - start)/1000 ;
            TEXT.innerHTML = 'GG WP! Your play time ' + diff + ' s.' + ' <br><br><span class="btn" id="restart" onClick="startGame()">Try again</span>';
        } else {
            genji.reduce();
        }
    }, INTERVAL);
    
    BTNS.forEach(function (currentValue, index, array) {
        BTNS[index].addEventListener('click', function() {
            if (genji.health > 0) {
                genji[this.id]();
            }
        }, false);
    });

    return true;
}

startGame();