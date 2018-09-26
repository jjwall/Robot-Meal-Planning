/// <reference path="./declarations/json.d.ts" />
import { GameState } from "./GameState";
import level1 from '../data/levels/level1.json';
import { GenerateLevel } from "./GenerateLevel";
import { SetUpEventListeners } from "./SetUpEventListeners";
import { FlowBlock } from "./FlowBlock";
import { Robot } from "./Robot";

// TODO: switch abstract class BaseBlock to be an interface called IBaseBlock 
// TODO: pass reference to GameState / GameState / prop in methods (draw, update) where needed
// -> can pass in to constructor as well
// --> don't want to store in a class member tho
// TODO: add big yellow block that renders behind grid blocks to indicate which block is currently being executed
// TODO: have FlowBlockButton and CommandBlockButtons extend from their respective blocks
// TODO: push most recently clicked command / flow block to top of block array to render it on top of everything else
// TODO: switch spacebar control button to clickable radio button
// TODO: add base UI class / switch slider[] to baseUIElement[] in GameState
// TODO: add execute program / stop program buttons
// TODO: add manifold collision system for gridblock collision with flow and command blocks.
// -> i.e. snap command block to grid block that has the biggest manifold

// set up game state
var gameState = new GameState();
GenerateLevel(gameState, level1, "lightblue");
SetUpEventListeners(gameState);

// test entity
let robot = new Robot(gameState, 375, 200, 25, 25);
gameState.entities.push(robot);

function draw() : void {
    gameState.ctx.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    gameState.ctx.beginPath();

    // render UI elements
    gameState.userInterfaces.forEach(userInterface => {
        userInterface.draw();
    });

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

    // render all entities
    gameState.entities.forEach(entity => {
        entity.draw();
    });

    gameState.ctx.stroke();
}

function update() : void {
    gameState.blocks.forEach(block => {
        block.update();
    });

    gameState.userInterfaces.forEach(userInterface => {
        userInterface.update();
    });

    // gameState.entities.forEach(entity => {
    //     entity.update();
    // });
}

setInterval(function() : void {
    update();
    draw();

    const callStack = gameState.nextStack;
    gameState.nextStack = [];

    if (callStack.length > 0 && gameState.programRunning) {
        callStack.forEach(block => {
            // will call command and push it back on stack
            if (block.currentCallCount > 0) {
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