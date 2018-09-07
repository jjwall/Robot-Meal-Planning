import { CommandBlock } from "./CommandBlock";
import { CommandPallete } from "./CommandPalette";

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    entities:any[];
    mouseX: number;
    mouseY: number;
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.entities = [];
        this.mouseX = 0;
        this.mouseY = 0;
    }
}

// set up game state
var gameState = new GameState();
new CommandPallete(gameState, 5, 5, "lightblue");
new CommandBlock(gameState, 50, 325, "orange");
new CommandBlock(gameState, 400, 325, "purple");

// set up canvas event listeners
gameState.canvas.addEventListener('mousedown', function() {
    // Collision detection between clicked offset and element.
    gameState.entities.forEach(function(element) {
        if (gameState.mouseY > element.y && gameState.mouseY < element.y + element.h
            && gameState.mouseX > element.x && gameState.mouseX < element.x + element.w) {
            element.mouseDown = true;
        }
    })
}, false);

gameState.canvas.addEventListener('mouseup', function(evt) {
    gameState.entities.forEach(function(entity) {
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
    gameState.entities.forEach(entity => {
        //ctx.strokeStyle = entity.color;
        gameState.ctx.fillStyle = entity.color;
        gameState.ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
        // ctx.fillRect(50, 50, 150, 100);
        // entity.draw(ctx);
    });
    gameState.ctx.stroke();
}

function update() : void {
    gameState.entities.forEach(entity => {
        entity.update();
    })
}

setInterval(function(){
    update();
    draw();
}, 12);
