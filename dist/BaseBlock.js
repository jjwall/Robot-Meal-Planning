define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseBlock = (function () {
        function BaseBlock(GameState, X, Y, H, W, Color) {
            this.GameState = GameState;
            this.X = X;
            this.Y = Y;
            this.H = H;
            this.W = W;
            this.Color = Color;
            this.gameState = GameState;
            this.x = X;
            this.y = Y;
            this.h = H;
            this.w = W;
            this.color = Color;
        }
        BaseBlock.prototype.draw = function () { };
        BaseBlock.prototype.update = function () { };
        return BaseBlock;
    }());
    exports.BaseBlock = BaseBlock;
});
//# sourceMappingURL=BaseBlock.js.map