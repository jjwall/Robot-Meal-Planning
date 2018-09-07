define(["require", "exports", "./CommandBlock", "./CommandPalette"], function (require, exports, CommandBlock_1, CommandPalette_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameState = (function () {
        function GameState() {
            this.canvas = document.getElementById("gameScreen");
            this.ctx = this.canvas.getContext("2d");
            this.blocks = [];
            this.mouseX = 0;
            this.mouseY = 0;
        }
        return GameState;
    }());
    exports.GameState = GameState;
    var gameState = new GameState();
    new CommandPalette_1.CommandPallete(gameState, 5, 5, "lightblue");
    new CommandBlock_1.CommandBlockButton(gameState, 5, 300, 50, 50, "orange", "move");
    new CommandBlock_1.CommandBlockButton(gameState, 60, 300, 50, 50, "purple", "angle");
    new CommandBlock_1.CommandBlockButton(gameState, 115, 300, 50, 50, "green", "laser");
    new CommandBlock_1.CommandBlockButton(gameState, 170, 300, 50, 50, "darkblue", "scan");
    new CommandBlock_1.CommandBlockButton(gameState, 225, 300, 50, 50, "maroon", "grapple");
    gameState.canvas.addEventListener('mousedown', function () {
        gameState.blocks.forEach(function (block) {
            if (gameState.mouseY > block.y && gameState.mouseY < block.y + block.h
                && gameState.mouseX > block.x && gameState.mouseX < block.x + block.w) {
                if (block instanceof CommandBlock_1.CommandBlock || block instanceof CommandBlock_1.CommandBlockButton) {
                    block.mouseDown = true;
                }
                else if (block instanceof CommandPalette_1.GridBlock) {
                    block.empty = true;
                }
            }
        });
    }, false);
    gameState.canvas.addEventListener('mouseup', function () {
        gameState.blocks.forEach(function (block) {
            if (block instanceof CommandBlock_1.CommandBlock) {
                if (block.mouseDown) {
                    block.mouseDown = false;
                }
            }
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