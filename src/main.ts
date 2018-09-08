/// <reference path="./declarations/json.d.ts" />

import { CommandBlock, CommandBlockButton } from "./CommandBlock";
import { GridBlock } from "./GridBlock";
import { BaseBlock } from "./BaseBlock";
// import level1 from '../data/levels/level1.json';
import { level1 } from "./level1";
import { LevelCreator } from "./LevelCreator";
import { SetUpEventListeners } from "./SetUpEventListeners";

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.rect = <ClientRect | DOMRect> this.canvas.getBoundingClientRect();
        this.blocks = [];
        this.mouseX = 0;
        this.mouseY = 0;
    }
}

// set up game state
var gameState = new GameState();
LevelCreator(gameState, level1, "lightblue");
SetUpEventListeners(gameState);

function draw() : void {
    gameState.ctx.strokeStyle = 'black';
    gameState.ctx.clearRect(0, 0, 800, 450);
    gameState.ctx.beginPath();
    gameState.blocks.forEach(entity => {
        //ctx.strokeStyle = entity.color;
        gameState.ctx.fillStyle = entity.color;
        gameState.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        // ctx.fillRect(50, 50, 150, 100);
        // entity.draw(ctx);
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
