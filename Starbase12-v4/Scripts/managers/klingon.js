// Enemy Manager Class
var managers;
(function (managers) {
    var Klingon = (function () {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++
        function Klingon() {
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Klingon.prototype.update = function () {
            for (var count = 0; count < enemies.length; count++) {
                enemies[count].update();
                enemies[count].integrityLabel.updateCache();
                enemies[count].updateCache();
            }
        };
        // Create new enemy ships
        Klingon.prototype.spawn = function () {
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
        };
        return Klingon;
    })();
    managers.Klingon = Klingon;
})(managers || (managers = {}));
//# sourceMappingURL=klingon.js.map