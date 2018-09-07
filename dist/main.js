define(["require", "exports", "./CommandBlock"], function (require, exports, CommandBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameState = (function () {
        function GameState() {
            this.canvas = document.getElementById("gameScreen");
            this.ctx = this.canvas.getContext("2d");
            this.mouseX = 0;
            this.mouseY = 0;
        }
        return GameState;
    }());
    exports.GameState = GameState;
    var gameState = new GameState();
    var entities = [];
    var block1 = new CommandBlock_1.CommandBlock(gameState, 50, 325, "orange");
    var block2 = new CommandBlock_1.CommandBlock(gameState, 400, 325, "purple");
    entities.push(block1);
    entities.push(block2);
    gameState.canvas.addEventListener('mousedown', function () {
        entities.forEach(function (element) {
            if (gameState.mouseY > element.y && gameState.mouseY < element.y + element.h
                && gameState.mouseX > element.x && gameState.mouseX < element.x + element.w) {
                element.mouseDown = true;
            }
        });
    }, false);
    gameState.canvas.addEventListener('mouseup', function (evt) {
        entities.forEach(function (entity) {
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
        entities.forEach(function (entity) {
            gameState.ctx.fillStyle = entity.color;
            gameState.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        });
        gameState.ctx.stroke();
    }
    function update() {
        entities.forEach(function (entity) {
            entity.update();
        });
    }
    setInterval(function () {
        update();
        draw();
    }, 12);
});
//# sourceMappingURL=main.js.map