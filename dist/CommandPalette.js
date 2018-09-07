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
define(["require", "exports", "./BaseBlock", "./CommandBlock"], function (require, exports, BaseBlock_1, CommandBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandPallete = (function () {
        function CommandPallete(GameState, BlocksHigh, BlocksWide, BlockColor) {
            this.gameState = GameState;
            var yOffset = 5;
            var xOffset = 5;
            for (var i = 0; i < BlocksHigh; i++) {
                for (var j = 0; j < BlocksWide; j++) {
                    new GridBlock(this.gameState, xOffset, yOffset, 50, 50, BlockColor);
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
        function GridBlock(GameState, X, Y, H, W, Color) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.empty = true;
            _this.gameState.blocks.push(_this);
            return _this;
        }
        GridBlock.prototype.update = function () {
            var _this = this;
            this.gameState.blocks.forEach(function (block) {
                if (block instanceof CommandBlock_1.CommandBlock) {
                    if (block.mouseDown === false) {
                        if (block.x < _this.x + _this.w &&
                            block.x + block.w > _this.x &&
                            block.y < _this.y + _this.h &&
                            block.h + block.y > _this.y) {
                            if (_this.empty) {
                                block.x = _this.x;
                                block.y = _this.y;
                                block.set = true;
                                _this.empty = false;
                            }
                        }
                    }
                }
            });
        };
        return GridBlock;
    }(BaseBlock_1.BaseBlock));
    exports.GridBlock = GridBlock;
});
//# sourceMappingURL=CommandPalette.js.map