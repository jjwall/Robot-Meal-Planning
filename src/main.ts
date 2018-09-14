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

    gameState.nextCall = [];

    if (gameState.callStack.length > 0) {
        gameState.callStack.forEach(block => {
            if (block.callCount > 0) {
                block.call();
                gameState.nextCall.push(block);
                gameState.callStack = gameState.nextCall;
            }
            else {
                block.call();
            }
        });
        // if (gameState.callStack.length > 0)
        gameState.callStack = gameState.nextCall;
    }
    else {
        gameState.programRunning = false;
    }
        // gameState.callStack = gameState.nextCall;
}, 12);