/// <reference path="./declarations/json.d.ts" />
import { BaseBlock } from "./BaseBlock";
import { IGameState } from "./IGameState";
import level1 from '../data/levels/level1.json';
import { LevelCreator } from "./LevelCreator";
import { SetUpEventListeners } from "./SetUpEventListeners";
import { FlowBlock } from "./FlowBlock";

// TODO: add code matrix for program
// TODO: push most recently clicked command / flow block to top of block array to render it on top of everything else
// TODO: switch spacebar control button to clickable radio button

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    commandControl: boolean;
    flowControl: boolean;
    programStack: any[];
    programRunning: boolean;
    constructor(obj?: IGameState) {
        this.canvas = obj && obj.canvas || <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = obj && obj.ctx || <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.rect = obj && obj.rect || <ClientRect | DOMRect> this.canvas.getBoundingClientRect();
        this.blocks = obj && obj.blocks || [];
        this.mouseX = obj && obj.mouseX || 0;
        this.mouseY = obj && obj.mouseY || 0;
        this.commandControl = obj && obj.commandControl || true;
        this.flowControl = obj && obj.flowControl || false;
        this.programStack = obj && obj.programStack || [];
        this.programRunning = obj && obj.programRunning || false;
    }
}

// set up game state
var gameState = new GameState();
LevelCreator(gameState, level1, "lightblue");
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

    if (gameState.programStack.length > 0 && gameState.programRunning) {
        gameState.programStack.forEach(call => {
            // figure out how to make these async
            call();
            gameState.programStack.pop();
        });
    }
    else {
        gameState.programRunning = false;
    }
}, 12);