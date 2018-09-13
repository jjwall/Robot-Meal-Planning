import { GameState } from "./GameState";
import { GridBlock } from "./GridBlock";
import { CommandBlockTypes, FlowBlockTypes } from "./Enums";

function moveCall(gameState: GameState, block: GridBlock) {
    console.log("move");
    gameState.callStack.push(findNextCall(gameState, block));
}

function angleCall(gameState: GameState, block: GridBlock) {
    console.log("angle");
    gameState.callStack.push(findNextCall(gameState, block));
}

// function will only have findNextExecution bit
// won't do anything except continue execution if players use it like a normal command block
function startCall(gameState: GameState, block: GridBlock) {
    console.log("start");
    gameState.callStack.push(findNextCall(gameState, block));
}

function stopThreadCall(gameState: GameState) {
    console.log("stopping thread");
    gameState.callStack = [];
    gameState.programRunning = false;
}

export function startNewThreadCall(gameState: GameState, thread: number) {
    // locate thread
    gameState.blocks.forEach(block => {
        if (block instanceof GridBlock) {
            if (block.commandType === CommandBlockTypes.Start //&& threadNumber === thread
                && block.flowType !== FlowBlockTypes.Empty)
            {
                // start thread
                gameState.callStack.push(findNextCall(gameState, block));
            }
        }
    });
}

function findNextCall(gameState: GameState, block: GridBlock) : any {
    let targetRow: number;
    let targetCol: number;
    // TODO: add conditionals
    // this will work well here since each call finds the next call
    // after it has already executed
    switch(block.flowType) {
        case FlowBlockTypes.Up:
            targetRow = block.r - 1;
            targetCol = block.c;
            break;
        case FlowBlockTypes.Down:
            targetRow = block.r + 1;
            targetCol = block.c;
            break;
        case FlowBlockTypes.Right:
            targetCol = block.c + 1;
            targetRow = block.r;
            break;
        case FlowBlockTypes.Left:
            targetCol = block.c - 1;
            targetRow = block.r;
            break;
    }

    gameState.blocks.forEach(block => {
        if (block instanceof GridBlock) {
            if (block.r === targetRow && block.c === targetCol
                && block.commandType !== CommandBlockTypes.Empty
                && block.flowType !== FlowBlockTypes.Empty) {
                switch(block.commandType) {
                    case CommandBlockTypes.Angle:
                        return angleCall(gameState, block);
                    case CommandBlockTypes.Move:
                        return moveCall(gameState, block);
                    case CommandBlockTypes.Start:
                        return startCall(gameState, block);
                    default:
                        return stopThreadCall(gameState);
                }
            }
        }
    });

    return stopThreadCall(gameState);
}