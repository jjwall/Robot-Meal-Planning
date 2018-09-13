import { GameState } from "./main";
import { GridBlock } from "./GridBlock";
import { CommandBlockTypes, FlowBlockTypes } from "./Enums";

function move(gameState: GameState, block: GridBlock) {
    console.log("move");
    gameState.programStack.push(findNextExecution(gameState, block));
}

function angle(gameState: GameState, block: GridBlock) {
    console.log("angle");
    gameState.programStack.push(findNextExecution(gameState, block));
}

function start(gameState: GameState, block: GridBlock) {
    console.log("start");
    gameState.programStack.push(findNextExecution(gameState, block));
}

function stopThread(gameState: GameState) {
    console.log("stopping thread");
    gameState.programStack = [];
    gameState.programRunning = false;
}

export function startNewThread(gameState: GameState, thread: number) {
    // locate thread
    gameState.blocks.forEach(block => {
        if (block instanceof GridBlock) {
            if (block.commandType === CommandBlockTypes.Start //&& threadNumber === thread
                && block.flowType !== FlowBlockTypes.Empty)
            {
                // start thread
                gameState.programStack.push(findNextExecution(gameState, block));
            }
        }
    });
}

function findNextExecution(gameState: GameState, block: GridBlock) : any {
    let targetRow: number;
    let targetCol: number;
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
                        return angle(gameState, block);
                        break;
                    case CommandBlockTypes.Move:
                        return move(gameState, block);
                        break;
                    case CommandBlockTypes.Start:
                        return start(gameState, block);
                        break;
                    default:
                        return stopThread(gameState);
                        break;
                }
            }
        }
    });

    return stopThread(gameState);
}