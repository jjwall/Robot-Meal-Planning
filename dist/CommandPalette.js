var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./BaseBlock"], function (require, exports, BaseBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandPallete = (function () {
        function CommandPallete(GameState, BlocksHigh, BlocksWide, BlockColor) {
            this.gameState = GameState;
            var yOffset = 5;
            var xOffset = 5;
            for (var i = 0; i < BlocksHigh; i++) {
                for (var j = 0; j < BlocksWide; j++) {
                    this.gameState.blocks.push(new GridBlock(xOffset, yOffset, 50, 50, BlockColor));
                    xOffset += 55;
                }
                yOffset += 55;
                xOffset = 5;
            }
        }
        return CommandPallete;
    }());
    exports.CommandPallete = CommandPallete;
    var GridBlock = (function (_super) {
        __extends(GridBlock, _super);
        function GridBlock(X, Y, H, W, Color) {
            return _super.call(this, X, Y, H, W, Color) || this;
        }
        GridBlock.prototype.update = function () {
        };
        return GridBlock;
    }(BaseBlock_1.BaseBlock));
});
//# sourceMappingURL=CommandPalette.js.map