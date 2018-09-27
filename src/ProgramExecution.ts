import { GameState } from "./GameState";
import { GridBlock } from "./GridBlock";
import { CommandTypes, FlowTypes } from "./Enums";
import { Robot } from "./Robot";

function moveCall(gameState: GameState, block: GridBlock) {
    if (block.currentCallCount > 0) {
        console.log("move");
        block.currentCallCount--;

        gameState.entities.forEach(entity => {
            // CONSIDER passing in reference to robot in these call functions
            if (entity instanceof Robot) {
                entity.move(block.commandData.unitsPerCall);
            }
        });
    }
    else {
        findNextCall(gameState, block);
    }
}

function angleCall(gameState: GameState, block: GridBlock) {
    if (block.currentCallCount > 0) {
        console.log("angle");
        block.currentCallCount--;

        gameState.entities.forEach(entity => {
            // CONSIDER passing in reference to robot in these call functions
            if (entity instanceof Robot) {
                entity.turnClockWise(block.commandData.unitsPerCall);
            }
        });
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

export function startNewThreadCall(gameState: GameState, targetThread: number, threadBlock?: GridBlock) {
    // locate target thread and find it's next call
    gameState.blocks.forEach(block => {
        if (block instanceof GridBlock) {
            if (block.commandData.type === CommandTypes.Start
                && block.commandData.totalUnits === targetThread
                && block.flowType !== FlowTypes.Empty)
            {
                // start thread
                findNextCall(gameState, block);
            }
        }
    });

    // if available, continue on to current thread's next call
    if (threadBlock !== undefined) {
        console.log("thread");
        findNextCall(gameState, threadBlock);
    }
}

function findNextCall(gameState: GameState, prevBlock: GridBlock) : void {
    let targetRow: number;
    let targetCol: number;
    // reset call count
    prevBlock.currentCallCount = prevBlock.commandData.callCount;
    // TODO: add conditionals
    // this will work well here since each call finds the next call
    // after it has already executed
    switch(prevBlock.flowType) {
        case FlowTypes.Up:
            targetRow = prevBlock.r - 1;
            targetCol = prevBlock.c;
            break;
        case FlowTypes.Down:
            targetRow = prevBlock.r + 1;
            targetCol = prevBlock.c;
            break;
        case FlowTypes.Right:
            targetCol = prevBlock.c + 1;
            targetRow = prevBlock.r;
            break;
        case FlowTypes.Left:
            targetCol = prevBlock.c - 1;
            targetRow = prevBlock.r;
            break;
    }

    gameState.blocks.forEach(block => {
        if (block instanceof GridBlock) {
            if (block.r === targetRow && block.c === targetCol
                && block.commandData.type !== CommandTypes.Empty
                && block.flowType !== FlowTypes.Empty) {
                switch(block.commandData.type) {
                    case CommandTypes.Angle:
                        block.call = () => angleCall(gameState, block);
                        gameState.nextStack.push(block);
                        break;
                    case CommandTypes.Move:
                        block.call = () => moveCall(gameState, block);
                        gameState.nextStack.push(block);
                        break;
                    case CommandTypes.Start:
                        block.call = () => startCall(gameState, block);
                        gameState.nextStack.push(block);
                        break;
                    case CommandTypes.Thread:
                        block.call = () => startNewThreadCall(gameState, block.commandData.totalUnits, block);
                        gameState.nextStack.push(block);
                        break;
                }
            }
        }
    });
}