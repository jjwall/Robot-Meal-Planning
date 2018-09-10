define(["require", "exports", "./CommandBlock", "./GridBlock", "./FlowBlock", "./Enums"], function (require, exports, CommandBlock_1, GridBlock_1, FlowBlock_1, Enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function SetUpEventListeners(gameState) {
        gameState.canvas.addEventListener('mousedown', function () {
            gameState.blocks.forEach(function (block) {
                if (gameState.mouseY > block.y && gameState.mouseY < block.y + block.h
                    && gameState.mouseX > block.x && gameState.mouseX < block.x + block.w) {
                    if (block instanceof CommandBlock_1.CommandBlock && gameState.commandControl
                        || block instanceof CommandBlock_1.CommandBlockButton && gameState.commandControl
                        || block instanceof FlowBlock_1.FlowBlock && gameState.flowControl
                        || block instanceof FlowBlock_1.FlowBlockButton && gameState.flowControl) {
                        block.mouseDown = true;
                    }
                    else if (block instanceof GridBlock_1.GridBlock) {
                        if (gameState.commandControl) {
                            block.commandType = Enums_1.CommandBlockTypes.Empty;
                        }
                        else if (gameState.flowControl) {
                            block.flowType = Enums_1.FlowBlockTypes.Empty;
                        }
                    }
                }
            });
        }, false);
        gameState.canvas.addEventListener('mouseup', function () {
            gameState.blocks.forEach(function (block) {
                if (block instanceof CommandBlock_1.CommandBlock
                    || block instanceof FlowBlock_1.FlowBlock) {
                    if (block.mouseDown) {
                        block.mouseDown = false;
                    }
                }
            });
        }, false);
        gameState.canvas.addEventListener('mousemove', function (evt) {
            gameState.mouseX = (evt.clientX - gameState.rect.left) / (gameState.rect.right - gameState.rect.left) * gameState.canvas.width;
            gameState.mouseY = (evt.clientY - gameState.rect.top) / (gameState.rect.bottom - gameState.rect.top) * gameState.canvas.height;
        }, false);
        window.onkeyup = function (e) {
            if (e.keyCode === 32) {
                if (gameState.flowControl) {
                    gameState.flowControl = false;
                    gameState.commandControl = true;
                    console.log("Command Control!");
                }
                else if (gameState.commandControl) {
                    gameState.commandControl = false;
                    gameState.flowControl = true;
                    console.log("Flow Control!");
                }
            }
            if (e.keyCode === 83) {
                var programBlocks_1 = 0;
                var visitedBlocks_1 = [];
                var targetRow_1 = 0;
                var targetCol_1 = 0;
                gameState.blocks.forEach(function (block) {
                    if (block instanceof GridBlock_1.GridBlock) {
                        if (block.commandType !== Enums_1.CommandBlockTypes.Empty
                            && block.flowType !== Enums_1.FlowBlockTypes.Empty) {
                            programBlocks_1++;
                            if (block.commandType === Enums_1.CommandBlockTypes.Start) {
                                targetRow_1 = block.r;
                                targetCol_1 = block.c;
                                visitedBlocks_1.push([targetRow_1, targetCol_1]);
                            }
                        }
                    }
                });
                for (var i = 0; i < programBlocks_1; i++) {
                    gameState.blocks.forEach(function (block) {
                        if (block instanceof GridBlock_1.GridBlock) {
                            if (block.commandType !== Enums_1.CommandBlockTypes.Empty
                                && block.flowType !== Enums_1.FlowBlockTypes.Empty) {
                                if (block.r === targetRow_1 && block.c === targetCol_1) {
                                    console.log(Enums_1.CommandBlockTypes[block.commandType]);
                                    switch (block.flowType) {
                                        case Enums_1.FlowBlockTypes.Up:
                                            targetRow_1--;
                                            if ((visitedBlocks_1.filter(function (block) { return block === [targetRow_1, targetCol_1]; }).length > 0)) {
                                                programBlocks_1++;
                                            }
                                            else {
                                                visitedBlocks_1.push([targetRow_1, targetCol_1]);
                                            }
                                            break;
                                        case Enums_1.FlowBlockTypes.Down:
                                            targetRow_1++;
                                            if ((visitedBlocks_1.filter(function (block) { return block === [targetRow_1, targetCol_1]; }).length > 0)) {
                                                programBlocks_1++;
                                            }
                                            else {
                                                visitedBlocks_1.push([targetRow_1, targetCol_1]);
                                            }
                                            break;
                                        case Enums_1.FlowBlockTypes.Right:
                                            targetCol_1++;
                                            if ((visitedBlocks_1.filter(function (block) { return block === [targetRow_1, targetCol_1]; }).length > 0)) {
                                                programBlocks_1++;
                                            }
                                            else {
                                                visitedBlocks_1.push([targetRow_1, targetCol_1]);
                                            }
                                            break;
                                        case Enums_1.FlowBlockTypes.Left:
                                            targetCol_1--;
                                            if ((visitedBlocks_1.filter(function (block) { return block === [targetRow_1, targetCol_1]; }).length > 0)) {
                                                programBlocks_1++;
                                            }
                                            else {
                                                visitedBlocks_1.push([targetRow_1, targetCol_1]);
                                            }
                                            break;
                                    }
                                }
                            }
                        }
                    });
                }
            }
        };
    }
    exports.SetUpEventListeners = SetUpEventListeners;
});
//# sourceMappingURL=SetUpEventListeners.js.map