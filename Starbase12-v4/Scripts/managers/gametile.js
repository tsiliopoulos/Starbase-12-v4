// Game Tile Manager
var managers;
(function (managers) {
    var GameTile = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++
        function GameTile() {
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        // Initialize Game Tile Matrix
        GameTile.prototype.init = function () {
            var count = 0;
            for (var row = 0; row < config.TILE_ROW; row++) {
                for (var col = 0; col < config.TILE_COL; col++) {
                    gameTiles[count] = new createjs.Point();
                    gameTiles[count].x = 35 + (col * config.TILE_WIDTH);
                    gameTiles[count].y = 34 + (row * config.TILE_HEIGHT);
                    count++;
                }
            }
        };
        // Get Location for game entity from Game Tile Array
        GameTile.prototype.getLocation = function (entity) {
            var TileLocation = Math.floor(Math.random() * gameTiles.length);
            entity.location.x = gameTiles[TileLocation].x + config.TILE_WIDTH * 0.5;
            entity.location.y = gameTiles[TileLocation].y + config.TILE_HEIGHT * 0.5;
            gameTiles.splice(TileLocation, 1);
            entity.x = entity.location.x;
            entity.y = entity.location.y;
            entity.shield.x = entity.x;
            entity.shield.y = entity.y;
        };
        return GameTile;
    })();
    managers.GameTile = GameTile;
})(managers || (managers = {}));
//# sourceMappingURL=gametile.js.map