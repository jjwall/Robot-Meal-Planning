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
define(["require", "exports", "./BaseBlock", "./CommandBlock", "./FlowBlock", "./Enums"], function (require, exports, BaseBlock_1, CommandBlock_1, FlowBlock_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridBlock = (function (_super) {
        __extends(GridBlock, _super);
        function GridBlock(GameState, X, Y, H, W, Row, Column, Color) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.r = Row;
            _this.c = Column;
            _this.commandType = Enums_1.CommandBlockTypes.Empty;
            _this.flowType = Enums_1.FlowBlockTypes.Empty;
            _this.gameState.blocks.push(_this);
            return _this;
        }
        GridBlock.prototype.update = function () {
            var _this = this;
            this.gameState.blocks.forEach(function (block) {
                if (block instanceof CommandBlock_1.CommandBlock
                    || block instanceof FlowBlock_1.FlowBlock) {
                    if (block.mouseDown === false) {
                        if (block.x < _this.x + _this.w &&
                            block.x + block.w > _this.x &&
                            block.y < _this.y + _this.h &&
                            block.h + block.y > _this.y) {
                            if (_this.commandType === Enums_1.CommandBlockTypes.Empty
                                && block instanceof CommandBlock_1.CommandBlock) {
                                block.x = _this.x;
                                block.y = _this.y;
                                block.set = true;
                                _this.commandType = block.type;
                            }
                            else if (_this.flowType === Enums_1.FlowBlockTypes.Empty
                                && block instanceof FlowBlock_1.FlowBlock) {
                                block.x = _this.x;
                                block.y = _this.y;
                                block.set = true;
                                _this.flowType = block.type;
                            }
                        }
                    }
                }
            });
        };
        GridBlock.prototype.draw = function () {
            this.gameState.ctx.fillStyle = this.color;
            this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
        };
        return GridBlock;
    }(BaseBlock_1.BaseBlock));
    exports.GridBlock = GridBlock;
});
//# sourceMappingURL=GridBlock.js.map