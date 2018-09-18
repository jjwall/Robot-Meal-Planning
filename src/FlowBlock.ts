import { GameState } from "./GameState";
import { BaseBlock } from "./BaseBlock";
import { FlowBlockTypes } from "./Enums";

export class FlowBlock extends BaseBlock {
    gameState: GameState;
    type: FlowBlockTypes;
    x: number;
    y: number;
    w: number;
    h: number;
    mouseDown: boolean;
    set: boolean;
    image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: FlowBlockTypes) {
        super(GameState, X, Y, H, W, Color);
        this.gameState = GameState;
        this.type = Type;
        this.mouseDown = true;
        this.set = false;
        this.image = new Image();
        switch(Type) {
            case FlowBlockTypes.Up:
                this.image.src = "data/textures/UpArrow.png";
                break;
            case FlowBlockTypes.Down:
                this.image.src = "data/textures/DownArrow.png";
                break;
            case FlowBlockTypes.Left:
                this.image.src = "data/textures/LeftArrow.png";
                break;
            case FlowBlockTypes.Right:
                this.image.src = "data/textures/RightArrow.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    update() : void {
        // drag flow block
        if (this.mouseDown) {
            this.x = this.gameState.mouseX - this.w/2;
            this.y = this.gameState.mouseY - this.h/2;
            this.set = false;
        }

        // delete if dropping block and it doesn't have a empty grid block to be set on
        if (!this.mouseDown && !this.set) {
            var index = this.gameState.blocks.indexOf(this);
            this.gameState.blocks.splice(index, 1);
        }
    }

    draw() : void {
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
        this.gameState.ctx.strokeStyle = this.color;
        this.gameState.ctx.rect(this.x, this.y, this.w, this.h);
    }
}

// CONSIDER: Extending FlowBlock here
export class FlowBlockButton extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    mouseDown: boolean;
    type: FlowBlockTypes;
    image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: FlowBlockTypes) {
        super(GameState, X, Y, H, W, Color);
        this.type = Type;
        this.mouseDown = false;
        this.image = new Image();
        switch(Type) {
            case FlowBlockTypes.Up:
                this.image.src = "data/textures/UpArrow.png";
                break;
            case FlowBlockTypes.Down:
                this.image.src = "data/textures/DownArrow.png";
                break;
            case FlowBlockTypes.Left:
                this.image.src = "data/textures/LeftArrow.png";
                break;
            case FlowBlockTypes.Right:
                this.image.src = "data/textures/RightArrow.png";
                break;
        }

        this.gameState.blocks.push(this);
    }
    update() : void {
        if (this.mouseDown) {
            this.mouseDown = false;
            new FlowBlock(this.gameState, this.x, this.y, this.h, this.w, this.Color, this.type);
        }
    }

    draw() : void {
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
        this.gameState.ctx.strokeStyle = this.color;
        this.gameState.ctx.rect(this.x, this.y, this.w, this.h);
    }
}