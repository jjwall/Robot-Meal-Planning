import { GameState } from "./GameState";
import { GridBlock } from "./GridBlock";
import { CommandBlockTypes, FlowBlockTypes } from "./Enums";

function moveCall(gameState: GameState, block: GridBlock) {
    if (block.callCount > 0) {
        console.log("move");
        block.callCount--;
    }
    else {
        findNextCall(gameState, block);
    }
}

function angleCall(gameState: GameState, block: GridBlock) {
    if (block.callCount > 0) {
        console.log("angle");
        block.callCount--;
    }
    else {
        findNextCall(gameState, block);
    }
}

// function will only have findNextExecution bit
// won't do anything except continue execution if players use it like a normal command block
function startCall(gameState: GameState, block: GridBlock) {
    console.log("start");
    findNextCall(gameState, block);
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
                // gameState.callStack.push(findNextCall(gameState, block));
                findNextCall(gameState, block);
            }
        }
    });
}

function findNextCall(gameState: GameState, prevBlock: GridBlock) : void {
    let targetRow: number;
    let targetCol: number;
    // TODO: add conditionals
    // this will work well here since each call finds the next call
    // after it has already executed
    switch(prevBlock.flowType) {
        case FlowBlockTypes.Up:
            targetRow = prevBlock.r - 1;
            targetCol = prevBlock.c;
            break;
        case FlowBlockTypes.Down:
            targetRow = prevBlock.r + 1;
            targetCol = prevBlock.c;
            break;
        case FlowBlockTypes.Right:
            targetCol = prevBlock.c + 1;
            targetRow = prevBlock.r;
            break;
        case FlowBlockTypes.Left:
            targetCol = prevBlock.c - 1;
            targetRow = prevBlock.r;
            break;
    }

    gameState.blocks.forEach(block => {
        if (block instanceof GridBlock) {
            if (block.r === targetRow && block.c === targetCol
                && block.commandType !== CommandBlockTypes.Empty
                && block.flowType !== FlowBlockTypes.Empty) {
                switch(block.commandType) {
                    case CommandBlockTypes.Angle:
                        block.call = () => angleCall(gameState, block);
                        block.callCount = 1; // test amoun
                        // gameState.callStack.push(block);
                        gameState.nextCall.push(block);
                        gameState.callStack = gameState.nextCall;
                        break;
                    case CommandBlockTypes.Move:
                        block.call = () => moveCall(gameState, block);
                        block.callCount = 20; // test amount
                        // gameState.callStack.push(block);
                        gameState.nextCall.push(block);
                        gameState.callStack = gameState.nextCall;
                        break;
                    case CommandBlockTypes.Start:
                        block.call = () => startCall(gameState, block);
                        block.callCount = 0;
                        // gameState.callStack.push(block);
                        gameState.nextCall.push(block);
                        gameState.callStack = gameState.nextCall;
                        break;
                    // default:
                    //     return stopThreadCall(gameState);
                }
            }
        }
    });
}