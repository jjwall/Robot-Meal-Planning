define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandPallete = (function () {
        function CommandPallete(GameState, SquaresHigh, SquaresWide, SquareColor) {
            this.gameState = GameState;
            var yOffset = 5;
            var xOffset = 5;
            for (var i = 0; i < SquaresHigh; i++) {
                for (var j = 0; j < SquaresWide; j++) {
                    this.gameState.entities.push(new GridSquare(xOffset, yOffset, SquareColor));
                    xOffset += 55;
                }
                yOffset += 55;
                xOffset = 5;
            }
        }
        return CommandPallete;
    }());
    exports.CommandPallete = CommandPallete;
    var GridSquare = (function () {
        function GridSquare(X, Y, Color) {
            this.x = X;
            this.y = Y;
            this.h = 50;
            this.w = 50;
            this.color = Color;
        }
        GridSquare.prototype.update = function () {
        };
        return GridSquare;
    }());
});
//# sourceMappingURL=CommandPalette.js.map