/// <reference path="./declarations/json.d.ts" />

import { CommandBlock, CommandBlockButton } from "./CommandBlock";
import { CommandPallete, GridBlock } from "./CommandPalette";
import { BaseBlock } from "./BaseBlock";
// import level1 from '../data/levels/level1.json';
import { level1 } from "./level1";

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.blocks = [];
        this.mouseX = 0;
        this.mouseY = 0;
    }
}

// set up game state
var gameState = new GameState();
var rect = <ClientRect | DOMRect> gameState.canvas.getBoundingClientRect();
// set up Pallete
new CommandPallete(gameState, 5, 5, "lightblue");
// test move button
new CommandBlockButton(gameState, 5, 300, 50, 50, "orange", "move");
// test angle button
new CommandBlockButton(gameState, 60, 300, 50, 50, "purple", "angle");
// test laser button
new CommandBlockButton(gameState, 115, 300, 50, 50, "green", "laser");
// test scan button
new CommandBlockButton(gameState, 170, 300, 50, 50, "darkblue", "scan");
// test grapple button
new CommandBlockButton(gameState, 225, 300, 50, 50, "maroon", "grapple");

// new CommandBlock(gameState, 50, 325, 50, 50, "orange");
// new CommandBlock(gameState, 400, 325, 50, 50, "purple");

// set up canvas event listeners
gameState.canvas.addEventListener('mousedown', function() : void {
    // Collision detection between clicked offset and block.
    gameState.blocks.forEach(function(block) : void {
        if (gameState.mouseY > block.y && gameState.mouseY < block.y + block.h
            && gameState.mouseX > block.x && gameState.mouseX < block.x + block.w) {
            if (block instanceof CommandBlock || block instanceof CommandBlockButton) {
                block.mouseDown = true;
            }
            else if (block instanceof GridBlock) {
                block.empty = true;
            }
        }
    })
}, false);

gameState.canvas.addEventListener('mouseup', function() : void {
    gameState.blocks.forEach(function(block) {
        if (block instanceof CommandBlock) {
            if (block.mouseDown) {
                block.mouseDown = false;
            }
        }
    })
}, false);

gameState.canvas.addEventListener('mousemove', function(evt: MouseEvent) : void {
    gameState.mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * gameState.canvas.width;
    gameState.mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * gameState.canvas.height;
}, false);

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
