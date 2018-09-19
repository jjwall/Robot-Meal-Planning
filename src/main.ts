/// <reference path="./declarations/json.d.ts" />
import { GameState } from "./GameState";
import level1 from '../data/levels/level1.json';
import { GenerateLevel } from "./GenerateLevel";
import { SetUpEventListeners } from "./SetUpEventListeners";
import { FlowBlock } from "./FlowBlock";
import { Slider } from "./Slider";

// TODO: add text-based (numbers) ui elements to command block
// TODO: make sliders functional
// TODO: remove test callCount values in ProgramExecution
// TODO: add big yellow block that renders behind grid blocks to indicate which block is currently being executed
// TODO: have FlowBlockButton and CommandBlockButtons extend from their respective blocks
// TODO: push most recently clicked command / flow block to top of block array to render it on top of everything else
// TODO: switch spacebar control button to clickable radio button
// TODO: add base UI class / switch slider[] to baseUIElement[] in GameState
// TODO: add execute program / stop program buttons

// set up game state
var gameState = new GameState();
GenerateLevel(gameState, level1, "lightblue");
SetUpEventListeners(gameState);

// set up test ui elements
gameState.sliders.push(new Slider(gameState, 80, 365, 4));
gameState.sliders.push(new Slider(gameState, 130, 365));

function draw() : void {
    gameState.ctx.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    gameState.ctx.beginPath();

    // render UI elements
    gameState.sliders.forEach(slider => {
        slider.draw();
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

    gameState.ctx.stroke();
}

function update() : void {
    gameState.blocks.forEach(block => {
        block.update();
    });

    gameState.sliders.forEach(slider => {
        slider.update();
    });
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