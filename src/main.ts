import { CommandBlock } from "./CommandBlock";

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    mouseX: number;
    mouseY: number;
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.mouseX = 0;
        this.mouseY = 0;
    }
}

var gameState = new GameState();
var entities:any[] = [];
var block1 = new CommandBlock(gameState, 50, 325, "orange");
var block2 = new CommandBlock(gameState, 400, 325, "purple");
entities.push(block1);
entities.push(block2);

gameState.canvas.addEventListener('mousedown', function() {
    // Collision detection between clicked offset and element.
    entities.forEach(function(element) {
        if (gameState.mouseY > element.y && gameState.mouseY < element.y + element.h
            && gameState.mouseX > element.x && gameState.mouseX < element.x + element.w) {
            element.mouseDown = true;
        }
    })
}, false);

gameState.canvas.addEventListener('mouseup', function(evt) {
    entities.forEach(function(entity) {
        if (entity.mouseDown)
            entity.mouseDown = false;
    })
}, false);

gameState.canvas.addEventListener('mousemove', function(evt: MouseEvent) : void {
    var rect = <ClientRect | DOMRect> gameState.canvas.getBoundingClientRect();
    gameState.mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * gameState.canvas.width;
    gameState.mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * gameState.canvas.height;
}, false);

function draw() : void {
    gameState.ctx.strokeStyle = 'black';
    gameState.ctx.clearRect(0, 0, 800, 450);
    gameState.ctx.beginPath();
    entities.forEach(entity => {
        //ctx.strokeStyle = entity.color;
        gameState.ctx.fillStyle = entity.color;
        gameState.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        // ctx.fillRect(50, 50, 150, 100);
        // entity.draw(ctx);
    });
    gameState.ctx.stroke();
}

function update() : void {
    entities.forEach(entity => {
        entity.update();
    })
}

setInterval(function(){
    update();
    draw();
}, 12);
