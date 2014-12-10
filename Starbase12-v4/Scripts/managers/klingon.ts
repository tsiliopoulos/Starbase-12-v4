// Enemy Manager Class
module managers {
    export class Klingon {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        update() {
            // Update Enemies
            for (var count = 0; count < enemies.length; count++) {
                enemies[count].update();
                enemies[count].integrityLabel.updateCache();
                enemies[count].updateCache();
            }
        }

        // Create new enemy ships
        spawn() {
            // Increase enemy number every 5 levels
            if (gameLevel % 5 == 0) {
                enemyLevel++;
            }

            for (var count = 0; count < (config.ENEMY_COUNT + enemyLevel); count++) {
                enemies[count] = new objects.Enemy();
                gameTile.getLocation(enemies[count]);
                game.addChild(enemies[count]);
                game.addChild(enemies[count].integrityLabel);
                enemies[count].integrityLabel.shadow = new createjs.Shadow('#FFF', 2, 2, 8);
                enemies[count].integrityLabel.filters = [colorFilter];
                enemies[count].integrityLabel.cache(0, 0, enemies[count].integrityLabel.getBounds().width, enemies[count].integrityLabel.getBounds().height);
                enemies[count].cache(0, 0, enemies[count].width, enemies[count].height);
            }
        }
    }
} 