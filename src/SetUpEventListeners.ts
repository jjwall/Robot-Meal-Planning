import { GameState } from "./main";
import { CommandBlock, CommandBlockButton } from "./CommandBlock";
import { GridBlock } from "./GridBlock";
import { FlowBlock, FlowBlockButton } from "./FlowBlock";
import { CommandBlockTypes, FlowBlockTypes } from "./Enums";
import { startNewThread } from "./ProgramExecution";

export function SetUpEventListeners(gameState: GameState) {
    gameState.canvas.addEventListener('mousedown', function() : void {
        // Collision detection between clicked offset and block.
        gameState.blocks.forEach(function(block) : void {
            if (gameState.mouseY > block.y && gameState.mouseY < block.y + block.h
                && gameState.mouseX > block.x && gameState.mouseX < block.x + block.w) {
                if (block instanceof CommandBlock && gameState.commandControl
                    || block instanceof CommandBlockButton && gameState.commandControl
                    || block instanceof FlowBlock && gameState.flowControl
                    || block instanceof FlowBlockButton && gameState.flowControl) {
                    block.mouseDown = true;
                }
                else if (block instanceof GridBlock) {
                    // check radio button for flow or command control
                    if (gameState.commandControl) {
                        block.commandType = CommandBlockTypes.Empty;
                    }
                    else if (gameState.flowControl) {
                        block.flowType = FlowBlockTypes.Empty;
                    }
                }
            }
        })
    }, false);

    gameState.canvas.addEventListener('mouseup', function() : void {
        gameState.blocks.forEach(function(block) {
            if (block instanceof CommandBlock
                || block instanceof FlowBlock) {
                if (block.mouseDown) {
                    block.mouseDown = false;
                }
            }
        })
    }, false);

    gameState.canvas.addEventListener('mousemove', function(evt: MouseEvent) : void {
        gameState.mouseX = (evt.clientX - gameState.rect.left) / (gameState.rect.right - gameState.rect.left) * gameState.canvas.width;
        gameState.mouseY = (evt.clientY - gameState.rect.top) / (gameState.rect.bottom - gameState.rect.top) * gameState.canvas.height;
    }, false);

    window.onkeyup = function(e) {
        // i.e. SpaceBar pressed
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

        // i.e. S key pressed
        if (e.keyCode === 83) {
            if (!gameState.programRunning) {
                gameState.programRunning = true;
                startNewThread(gameState, 1);
            }
        }
    }
}