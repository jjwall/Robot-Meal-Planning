/// <reference path="./declarations/json.d.ts" />
import { GameState } from "./GameState";
import level1 from '../data/levels/level1.json';
import { GenerateLevel } from "./GenerateLevel";
import { SetUpEventListeners } from "./SetUpEventListeners";
import { FlowBlock } from "./FlowBlock";

// TODO: add text-based ui elements to command blocks
// TODO: have FlowBlockButton and CommandBlockButtons extend from their respective blocks
// TODO: push most recently clicked command / flow block to top of block array to render it on top of everything else
// TODO: switch spacebar control button to clickable radio button

// set up game state
var gameState = new GameState();
GenerateLevel(gameState, level1, "lightblue");
SetUpEventListeners(gameState);

function draw() : void {
    gameState.ctx.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    gameState.ctx.beginPath();

    // render all non-flow blocks first
    gameState.blocks.forEach(block => {
        if (!(block instanceof FlowBlock)) {
            block.draw();
        }
    });

    // render all flow blocks last to layer them on top of command blocks
    gameState.blocks.forEach(block => {
        if (block instanceof FlowBlock) {
            block.draw();
        }
    });

    gameState.ctx.stroke();
}

function update() : void {
    gameState.blocks.forEach(block => {
        block.update();
    })
}

setInterval(function() : void {
    update();
    draw();

    const callStack = gameState.nextStack;
    gameState.nextStack = [];

    if (callStack.length > 0) {
        callStack.forEach(block => {
            // will call command and push it back on stack
            if (block.callCount > 0) {
                block.call();
                gameState.nextStack.push(block);
            }
            // else just call once and find next call
            else {
                block.call();
            }
        });
    }
    else {
        gameState.programRunning = false;
    }
}, 12);