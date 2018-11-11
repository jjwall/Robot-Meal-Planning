import { GameState } from "./GameState";
import { IBaseBlock } from "./IBaseBlock";
import { FlowTypes } from "./Enums";
import { GridBlock } from "./GridBlock";

export class FlowBlock implements IBaseBlock {
    protected gameState: GameState;
    readonly type: FlowTypes;
    public x: number;
    public y: number;
    readonly w: number;
    readonly h: number;
    public mouseDown: boolean;
    public set: boolean;
    public color: string;
    readonly image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: FlowTypes) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.color = Color;
        this.type = Type;
        this.mouseDown = true;
        this.set = false;
        this.image = new Image();
        switch(Type) {
            case FlowTypes.Up:
                this.image.src = "data/textures/UpArrow.png";
                break;
            case FlowTypes.Down:
                this.image.src = "data/textures/DownArrow.png";
                break;
            case FlowTypes.Left:
                this.image.src = "data/textures/LeftArrow.png";
                break;
            case FlowTypes.Right:
                this.image.src = "data/textures/RightArrow.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    /**
     * method called in SetUpEventListeners.ts
     */
    public mouseUp() : void {
        // drop flow block
        this.gameState.blocks.forEach(block => {
            if (block instanceof GridBlock && block.flowType === FlowTypes.Empty) {
                if (block.x < this.x + this.w &&
                    block.x + block.w > this.x &&
                    block.y < this.y + this.h &&
                    block.h + block.y > this.y)
                {
                    // snap this flow block to empty GridBlock
                    this.x = block.x;
                    this.y = block.y;
                    this.set = true;
                    block.flowType = this.type;
                    // set conditional properties here if conditional block
                }
            }
        });

        // delete if dropping block and it doesn't have an empty grid block to be set on
        if (!this.set) {
            var index = this.gameState.blocks.indexOf(this);
            this.gameState.blocks.splice(index, 1);
        }
    }

    public update() : void {
        // drag flow block
        if (this.mouseDown) {
            this.x = this.gameState.mouseX - this.w/2;
            this.y = this.gameState.mouseY - this.h/2;
            this.set = false;
        }
    }

    public draw() : void {
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
        this.gameState.ctx.strokeStyle = this.color;
        this.gameState.ctx.rect(this.x, this.y, this.w, this.h);
    }
}

// CONSIDER: Extending FlowBlock here
export class FlowBlockButton implements IBaseBlock {
    protected gameState: GameState;
    public x: number;
    public y: number;
    readonly w: number;
    readonly h: number;
    readonly color: string;
    public mouseDown: boolean;
    readonly type: FlowTypes;
    readonly image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: FlowTypes) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.color = Color;
        this.type = Type;
        this.mouseDown = false;
        this.image = new Image();
        switch(Type) {
            case FlowTypes.Up:
                this.image.src = "data/textures/UpArrow.png";
                break;
            case FlowTypes.Down:
                this.image.src = "data/textures/DownArrow.png";
                break;
            case FlowTypes.Left:
                this.image.src = "data/textures/LeftArrow.png";
                break;
            case FlowTypes.Right:
                this.image.src = "data/textures/RightArrow.png";
                break;
        }

        this.gameState.blocks.push(this);
    }

    public update() : void {
        if (this.mouseDown) {
            this.mouseDown = false;
            new FlowBlock(this.gameState, this.x, this.y, this.h, this.w, this.color, this.type);
        }
    }

    public draw() : void {
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
        this.gameState.ctx.strokeStyle = this.color;
        this.gameState.ctx.rect(this.x, this.y, this.w, this.h);
    }
}