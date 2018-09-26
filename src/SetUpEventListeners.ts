import { GameState } from "./GameState";
import { CommandBlock, CommandBlockButton } from "./CommandBlock";
import { GridBlock } from "./GridBlock";
import { FlowBlock, FlowBlockButton } from "./FlowBlock";
import { CommandTypes, FlowTypes } from "./Enums";
import { startNewThreadCall } from "./ProgramExecution";
import { Slider } from "./Slider";
import { ThreadObserver } from "./ThreadObserver";
import { PlusMinus } from "./PlusMinus";

export function SetUpEventListeners(gameState: GameState) {
    gameState.canvas.addEventListener('mousedown', function() : void {
        // Collision detection between clicked offset and block.
        gameState.blocks.forEach(block => {
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
                        block.commandData.type = CommandTypes.Empty;
                    }
                    else if (gameState.flowControl) {
                        block.flowType = FlowTypes.Empty;
                    }
                }
            }
        });

        // check for sliders being clicked
        gameState.userInterfaces.forEach(s => {
            if (s instanceof Slider) {
                if (gameState.mouseY > s.sliderY && gameState.mouseY < s.sliderY + s.sliderH
                    && gameState.mouseX > s.sliderX && gameState.mouseX < s.sliderX + s.sliderW) {
                    s.mouseDown = true;
                }
            }
            else if (s instanceof ThreadObserver) {
                if (gameState.mouseY > s.y && gameState.mouseY < s.y + s.h
                    && gameState.mouseX > s.x && gameState.mouseX < s.x + s.w) {
                    s.mouseDown = true;
                }
            }
            
            else if (s instanceof PlusMinus) {
                if (gameState.mouseY > s.plusY && gameState.mouseY < s.plusY + s.plusH
                    && gameState.mouseX > s.plusX && gameState.mouseX < s.plusX + s.plusW) {
                    s.mouseDown = true;
                    s.mouseDownPlus = true;
                }
                if (gameState.mouseY > s.minusY && gameState.mouseY < s.minusY + s.minusH
                    && gameState.mouseX > s.minusX && gameState.mouseX < s.minusX + s.minusW) {
                    s.mouseDown = true;
                    s.mouseDownMinus = true;
                }
            }
        });
    }, false);

    // make sure all clickable entities aren't clickable on mouseup
    gameState.canvas.addEventListener('mouseup', function() : void {
        gameState.blocks.forEach(block => {
            if (block instanceof CommandBlock
                || block instanceof FlowBlock) {
                if (block.mouseDown) {
                    block.mouseDown = false;
                    block.mouseUp();
                }
            }
        });

        gameState.userInterfaces.forEach(userInterface => {
            userInterface.mouseDown = false;
            if (userInterface instanceof ThreadObserver) {
                userInterface.mouseUp();
            }
        });
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
                // start program
                gameState.programRunning = true;
                startNewThreadCall(gameState, 1);
            }
            // if S key is pressed while program is running
            else {
                // stop program
                gameState.programRunning = false;
                gameState.nextStack = [];
            }
        }
    }
}