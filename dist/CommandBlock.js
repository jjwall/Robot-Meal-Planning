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
        function CommandBlock(GameState, X, Y, H, W, Color, Type) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.mouseDown = true;
            _this.set = false;
            _this.image = new Image();
            switch (Type) {
                case "start":
                    _this.image.src = "data/textures/StartBlock.png";
                    break;
                case "move":
                    _this.image.src = "data/textures/MoveBlock.png";
                    break;
                case "angle":
                    _this.image.src = "data/textures/AngleBlock.png";
                    break;
            }
            _this.gameState.blocks.push(_this);
            return _this;
        }
        CommandBlock.prototype.update = function () {
            if (this.mouseDown) {
                this.x = this.gameState.mouseX - this.w / 2;
                this.y = this.gameState.mouseY - this.h / 2;
                this.set = false;
            }
            if (!this.mouseDown && !this.set) {
                var index = this.gameState.blocks.indexOf(this);
                this.gameState.blocks.splice(index, 1);
            }
        };
        CommandBlock.prototype.draw = function () {
            this.gameState.ctx.fillStyle = this.color;
            this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
            this.gameState.ctx.translate(this.x, this.y);
            this.gameState.ctx.drawImage(this.image, 0, 0);
            this.gameState.ctx.translate(-this.x, -this.y);
        };
        return CommandBlock;
    }(BaseBlock_1.BaseBlock));
    exports.CommandBlock = CommandBlock;
    var CommandBlockButton = (function (_super) {
        __extends(CommandBlockButton, _super);
        function CommandBlockButton(GameState, X, Y, H, W, Color, Type) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.type = Type;
            _this.mouseDown = false;
            _this.image = new Image();
            switch (Type) {
                case "start":
                    _this.image.src = "data/textures/StartBlock.png";
                    break;
                case "move":
                    _this.image.src = "data/textures/MoveBlock.png";
                    break;
                case "angle":
                    _this.image.src = "data/textures/AngleBlock.png";
                    break;
            }
            _this.gameState.blocks.push(_this);
            return _this;
        }
        CommandBlockButton.prototype.update = function () {
            if (this.mouseDown) {
                this.mouseDown = false;
                new CommandBlock(this.gameState, this.x, this.y, this.h, this.w, this.Color, this.type);
            }
        };
        CommandBlockButton.prototype.draw = function () {
            this.gameState.ctx.fillStyle = this.color;
            this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
            this.gameState.ctx.translate(this.x, this.y);
            this.gameState.ctx.drawImage(this.image, 0, 0);
            this.gameState.ctx.translate(-this.x, -this.y);
        };
        return CommandBlockButton;
    }(BaseBlock_1.BaseBlock));
    exports.CommandBlockButton = CommandBlockButton;
});
//# sourceMappingURL=CommandBlock.js.map