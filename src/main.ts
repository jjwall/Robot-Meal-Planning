/// <reference path="./declarations/json.d.ts" />
import { BaseBlock } from "./BaseBlock";
// import level1 from '../data/levels/level1.json';
import { level1 } from "./level1";
import { LevelCreator } from "./LevelCreator";
import { SetUpEventListeners } from "./SetUpEventListeners";
import { GridBlock } from "./GridBlock";
import { CommandBlock, CommandBlockButton } from "./CommandBlock";
import { FlowBlock, FlowBlockButton } from "./FlowBlock";

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    commandControl: boolean;
    flowControl: boolean;
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.rect = <ClientRect | DOMRect> this.canvas.getBoundingClientRect();
        this.blocks = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.commandControl = true;
        this.flowControl = false;
    }
}

// set up game state
var gameState = new GameState();
LevelCreator(gameState, level1, "lightblue");
SetUpEventListeners(gameState);
// test flow buttons
new FlowBlockButton(gameState, 300, 5, 50, 50, "yellow", "up");
new FlowBlockButton(gameState, 300, 60, 50, 50, "yellow", "down");
new FlowBlockButton(gameState, 300, 115, 50, 50, "yellow", "left");
new FlowBlockButton(gameState, 300, 170, 50, 50, "yellow", "right");

function draw() : void {
    gameState.ctx.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    gameState.ctx.beginPath();
    gameState.blocks.forEach(block => {
        block.draw();
        // if (block instanceof CommandBlock
        //     || block instanceof CommandBlockButton
        //     || block instanceof GridBlock) {
        //     gameState.ctx.fillStyle = block.color;
        //     gameState.ctx.fillRect(block.x, block.y, block.w, block.h);
        // }
        // else if (block instanceof FlowBlock
        //         || block instanceof FlowBlockButton) {
        //     gameState.ctx.strokeStyle = block.color;
        //     gameState.ctx.rect(block.x, block.y, block.w, block.h);
        // }
    });

    gameState.ctx.stroke();
}

function update() : void {
    gameState.blocks.forEach(entity => {
        entity.update();
    })
}

setInterval(function() : void {
    update();
    draw();
}, 12);
