/// <reference path="./declarations/json.d.ts" />
import { GameState } from "./GameState";
import level1 from "../data/levels/level1.json";
import { GenerateLevel } from "./GenerateLevel";
import { SetUpEventListeners } from "./SetUpEventListeners";
import { FlowBlock } from "./FlowBlock";
import { Robot } from "./Robot";
import { IBaseUserInterface } from "./IBaseUserInterface";
import { IBaseEntity } from "./IBaseEntity";
import { IBaseBlock } from "./IBaseBlock";

// TODO: pass in PROPERTIES of GameState to various methods to clarify and
// make succinct the dependencies for the method
// ^TODO: pass reference to GameState / GameState / prop in methods (draw, update) where needed
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


function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, uis: IBaseUserInterface[], entities: IBaseEntity[], blocks: IBaseBlock[]) : void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // render UI elements
    uis.forEach(userInterface => {
        userInterface.draw();
    });

    // render all non-flow blocks first
    blocks.forEach(block => {
        if (!(block instanceof FlowBlock)) {
            block.draw(ctx);
        }
    });

    // render all flow blocks last to layer them on top of command blocks
    blocks.forEach(block => {
        if (block instanceof FlowBlock) {
            block.draw();
        }
    });

    // render all entities
    entities.forEach(entity => {
        entity.draw();
    });

    ctx.stroke();
}

function update(blocks: IBaseBlock[], uis: IBaseUserInterface[]) : void {
    blocks.forEach(block => {
        block.update();
    });

    uis.forEach(userInterface => {
        userInterface.update();
    });

    // entities.forEach(entity => {
    //     entity.update();
    // });
}

// Main function
(function(canvas: HTMLCanvasElement) {
    // set up game state
    var gameState = new GameState(canvas);

    GenerateLevel(gameState, level1, "lightblue");
    SetUpEventListeners(gameState);

    // Test entity
    let robot = new Robot(gameState, 375, 200, 25, 25);
    gameState.entities.push(robot);

    // Event pump
    setInterval(function() : void {
        update(gameState.blocks, gameState.userInterfaces);
        draw(gameState.ctx, gameState.canvas, gameState.userInterfaces, gameState.entities, gameState.blocks);

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
})(<HTMLCanvasElement> document.getElementById("gameScreen"));
