define(["require", "exports", "./level1", "./LevelCreator", "./SetUpEventListeners"], function (require, exports, level1_1, LevelCreator_1, SetUpEventListeners_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameState = (function () {
        function GameState() {
            this.canvas = document.getElementById("gameScreen");
            this.ctx = this.canvas.getContext("2d");
            this.rect = this.canvas.getBoundingClientRect();
            this.blocks = [];
            this.mouseX = 0;
            this.mouseY = 0;
        }
        return GameState;
    }());
    exports.GameState = GameState;
    var gameState = new GameState();
    LevelCreator_1.LevelCreator(gameState, level1_1.level1, "lightblue");
    SetUpEventListeners_1.SetUpEventListeners(gameState);
    function draw() {
        gameState.ctx.strokeStyle = 'black';
        gameState.ctx.clearRect(0, 0, 800, 450);
        gameState.ctx.beginPath();
        gameState.blocks.forEach(function (entity) {
            gameState.ctx.fillStyle = entity.color;
            gameState.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        });
        gameState.ctx.stroke();
    }
    function update() {
        gameState.blocks.forEach(function (entity) {
            entity.update();
        });
    }
    setInterval(function () {
        update();
        draw();
    }, 12);
});
//# sourceMappingURL=main.js.map