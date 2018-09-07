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
    var CommandBlock = (function (_super) {
        __extends(CommandBlock, _super);
        function CommandBlock(GameState, X, Y, H, W, Color) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.mouseDown = false;
            _this.gameState.blocks.push(_this);
            return _this;
        }
        CommandBlock.prototype.update = function () {
            if (this.mouseDown) {
                this.x = this.gameState.mouseX - this.w / 2;
                this.y = this.gameState.mouseY - this.h / 2;
            }
        };
        return CommandBlock;
    }(BaseBlock_1.BaseBlock));
    exports.CommandBlock = CommandBlock;
});
//# sourceMappingURL=CommandBlock.js.map