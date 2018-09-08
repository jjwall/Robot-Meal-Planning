define(["require", "exports", "./CommandBlock", "./GridBlock"], function (require, exports, CommandBlock_1, GridBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function SetUpEventListeners(gameState) {
        gameState.canvas.addEventListener('mousedown', function () {
            gameState.blocks.forEach(function (block) {
                if (gameState.mouseY > block.y && gameState.mouseY < block.y + block.h
                    && gameState.mouseX > block.x && gameState.mouseX < block.x + block.w) {
                    if (block instanceof CommandBlock_1.CommandBlock || block instanceof CommandBlock_1.CommandBlockButton) {
                        block.mouseDown = true;
                    }
                    else if (block instanceof GridBlock_1.GridBlock) {
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
            gameState.mouseX = (evt.clientX - gameState.rect.left) / (gameState.rect.right - gameState.rect.left) * gameState.canvas.width;
            gameState.mouseY = (evt.clientY - gameState.rect.top) / (gameState.rect.bottom - gameState.rect.top) * gameState.canvas.height;
        }, false);
    }
    exports.SetUpEventListeners = SetUpEventListeners;
});
//# sourceMappingURL=SetUpEventListeners.js.map