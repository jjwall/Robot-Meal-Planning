define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandBlock = (function () {
        function CommandBlock(GameState, X, Y, Color) {
            this.gameState = GameState;
            this.x = X;
            this.y = Y;
            this.w = 50;
            this.h = 50;
            this.color = Color;
            this.mouseDown = false;
        }
        CommandBlock.prototype.update = function () {
            if (this.mouseDown) {
                this.x = this.gameState.mouseX - this.w / 2;
                this.y = this.gameState.mouseY - this.h / 2;
            }
        };
        return CommandBlock;
    }());
    exports.CommandBlock = CommandBlock;
});
//# sourceMappingURL=CommandBlock.js.map