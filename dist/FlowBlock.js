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
define(["require", "exports", "./BaseBlock", "./Enums"], function (require, exports, BaseBlock_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FlowBlock = (function (_super) {
        __extends(FlowBlock, _super);
        function FlowBlock(GameState, X, Y, H, W, Color, Type) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.gameState = GameState;
            _this.type = Type;
            _this.mouseDown = true;
            _this.set = false;
            _this.image = new Image();
            switch (Type) {
                case Enums_1.FlowBlockTypes.Up:
                    _this.image.src = "data/textures/UpArrow.png";
                    break;
                case Enums_1.FlowBlockTypes.Down:
                    _this.image.src = "data/textures/DownArrow.png";
                    break;
                case Enums_1.FlowBlockTypes.Left:
                    _this.image.src = "data/textures/LeftArrow.png";
                    break;
                case Enums_1.FlowBlockTypes.Right:
                    _this.image.src = "data/textures/RightArrow.png";
                    break;
            }
            _this.gameState.blocks.push(_this);
            return _this;
        }
        FlowBlock.prototype.update = function () {
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
        FlowBlock.prototype.draw = function () {
            this.gameState.ctx.translate(this.x, this.y);
            this.gameState.ctx.drawImage(this.image, 0, 0);
            this.gameState.ctx.translate(-this.x, -this.y);
            this.gameState.ctx.strokeStyle = this.color;
            this.gameState.ctx.rect(this.x, this.y, this.w, this.h);
        };
        return FlowBlock;
    }(BaseBlock_1.BaseBlock));
    exports.FlowBlock = FlowBlock;
    var FlowBlockButton = (function (_super) {
        __extends(FlowBlockButton, _super);
        function FlowBlockButton(GameState, X, Y, H, W, Color, Type) {
            var _this = _super.call(this, GameState, X, Y, H, W, Color) || this;
            _this.type = Type;
            _this.mouseDown = false;
            _this.image = new Image();
            switch (Type) {
                case Enums_1.FlowBlockTypes.Up:
                    _this.image.src = "data/textures/UpArrow.png";
                    break;
                case Enums_1.FlowBlockTypes.Down:
                    _this.image.src = "data/textures/DownArrow.png";
                    break;
                case Enums_1.FlowBlockTypes.Left:
                    _this.image.src = "data/textures/LeftArrow.png";
                    break;
                case Enums_1.FlowBlockTypes.Right:
                    _this.image.src = "data/textures/RightArrow.png";
                    break;
            }
            _this.gameState.blocks.push(_this);
            return _this;
        }
        FlowBlockButton.prototype.update = function () {
            if (this.mouseDown) {
                this.mouseDown = false;
                new FlowBlock(this.gameState, this.x, this.y, this.h, this.w, this.Color, this.type);
            }
        };
        FlowBlockButton.prototype.draw = function () {
            this.gameState.ctx.translate(this.x, this.y);
            this.gameState.ctx.drawImage(this.image, 0, 0);
            this.gameState.ctx.translate(-this.x, -this.y);
            this.gameState.ctx.strokeStyle = this.color;
            this.gameState.ctx.rect(this.x, this.y, this.w, this.h);
        };
        return FlowBlockButton;
    }(BaseBlock_1.BaseBlock));
    exports.FlowBlockButton = FlowBlockButton;
});
//# sourceMappingURL=FlowBlock.js.map