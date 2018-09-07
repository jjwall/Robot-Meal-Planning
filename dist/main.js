define(["require", "exports", "./CommandBlock", "./CommandPalette"], function (require, exports, CommandBlock_1, CommandPalette_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameState = (function () {
        function GameState() {
            this.canvas = document.getElementById("gameScreen");
            this.ctx = this.canvas.getContext("2d");
            this.entities = [];
            this.mouseX = 0;
            this.mouseY = 0;
        }
        return GameState;
    }());
    exports.GameState = GameState;
    var gameState = new GameState();
    new CommandPalette_1.CommandPallete(gameState, 5, 5, "lightblue");
    new CommandBlock_1.CommandBlock(gameState, 50, 325, "orange");
    new CommandBlock_1.CommandBlock(gameState, 400, 325, "purple");
    gameState.canvas.addEventListener('mousedown', function () {
        gameState.entities.forEach(function (element) {
            if (gameState.mouseY > element.y && gameState.mouseY < element.y + element.h
                && gameState.mouseX > element.x && gameState.mouseX < element.x + element.w) {
                element.mouseDown = true;
            }
        });
    }, false);
    gameState.canvas.addEventListener('mouseup', function (evt) {
        gameState.entities.forEach(function (entity) {
            if (entity.mouseDown)
                entity.mouseDown = false;
        });
    }, false);
    gameState.canvas.addEventListener('mousemove', function (evt) {
        var rect = gameState.canvas.getBoundingClientRect();
        gameState.mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * gameState.canvas.width;
        gameState.mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * gameState.canvas.height;
    }, false);
    function draw() {
        gameState.ctx.strokeStyle = 'black';
        gameState.ctx.clearRect(0, 0, 800, 450);
        gameState.ctx.beginPath();
        gameState.entities.forEach(function (entity) {
            gameState.ctx.fillStyle = entity.color;
            gameState.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        });
        gameState.ctx.stroke();
    }
    function update() {
        gameState.entities.forEach(function (entity) {
            entity.update();
        });
    }
    setInterval(function () {
        update();
        draw();
    }, 12);
});
//# sourceMappingURL=main.js.map