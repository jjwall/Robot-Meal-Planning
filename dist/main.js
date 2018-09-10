define(["require", "exports", "./level1", "./LevelCreator", "./SetUpEventListeners", "./FlowBlock", "./Enums"], function (require, exports, level1_1, LevelCreator_1, SetUpEventListeners_1, FlowBlock_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameState = (function () {
        function GameState() {
            this.canvas = document.getElementById("gameScreen");
            this.ctx = this.canvas.getContext("2d");
            this.rect = this.canvas.getBoundingClientRect();
            this.blocks = [];
            this.mouseX = 0;
            this.mouseY = 0;
            this.commandControl = true;
            this.flowControl = false;
        }
        return GameState;
    }());
    exports.GameState = GameState;
    var gameState = new GameState();
    LevelCreator_1.LevelCreator(gameState, level1_1.level1, "lightblue");
    SetUpEventListeners_1.SetUpEventListeners(gameState);
    new FlowBlock_1.FlowBlockButton(gameState, 300, 5, 50, 50, "yellow", Enums_1.FlowBlockTypes.Up);
    new FlowBlock_1.FlowBlockButton(gameState, 300, 60, 50, 50, "yellow", Enums_1.FlowBlockTypes.Down);
    new FlowBlock_1.FlowBlockButton(gameState, 300, 115, 50, 50, "yellow", Enums_1.FlowBlockTypes.Left);
    new FlowBlock_1.FlowBlockButton(gameState, 300, 170, 50, 50, "yellow", Enums_1.FlowBlockTypes.Right);
    function draw() {
        gameState.ctx.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
        gameState.ctx.beginPath();
        gameState.blocks.forEach(function (block) {
            if (!(block instanceof FlowBlock_1.FlowBlock)) {
                block.draw();
            }
        });
        gameState.blocks.forEach(function (block) {
            if (block instanceof FlowBlock_1.FlowBlock) {
                block.draw();
            }
        });
        gameState.ctx.stroke();
    }
    function update() {
        gameState.blocks.forEach(function (block) {
            block.update();
        });
    }
    setInterval(function () {
        update();
        draw();
    }, 12);
});
//# sourceMappingURL=main.js.map