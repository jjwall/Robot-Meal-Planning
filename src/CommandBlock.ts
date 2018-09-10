import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";
import { CommandBlockTypes } from "./Enums";

export class CommandBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    mouseDown: boolean;
    set: boolean;
    type: CommandBlockTypes;
    image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: CommandBlockTypes) {
        super(GameState, X, Y, H, W, Color);
        this.mouseDown = true;
        this.set = false;
        this.image = new Image();
        switch(Type) {
            case CommandBlockTypes.Start:
                this.image.src = "data/textures/StartBlock.png";
                break;
            case CommandBlockTypes.Move:
                this.image.src = "data/textures/MoveBlock.png";
                break;
            case CommandBlockTypes.Angle:
                this.image.src = "data/textures/AngleBlock.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    update() : void {
        if (this.mouseDown) {
            this.x = this.gameState.mouseX - this.w/2;
            this.y = this.gameState.mouseY - this.h/2;
            this.set = false;
        }
        if (!this.mouseDown && !this.set) {
            var index = this.gameState.blocks.indexOf(this);
            this.gameState.blocks.splice(index, 1);
        }
    }

    draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
    }

    // onClick() {
    // }
}

// CONSIDER: extending CommandBlock class
export class CommandBlockButton extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    mouseDown: boolean;
    type: CommandBlockTypes;
    image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: CommandBlockTypes) {
        super(GameState, X, Y, H, W, Color);
        this.type = Type;
        this.mouseDown = false;
        this.image = new Image();
        switch(Type) {
            case CommandBlockTypes.Start:
                this.image.src = "data/textures/StartBlock.png";
                break;
            case CommandBlockTypes.Move:
                this.image.src = "data/textures/MoveBlock.png";
                break;
            case CommandBlockTypes.Angle:
                this.image.src = "data/textures/AngleBlock.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    update() : void {
        if (this.mouseDown) {
            this.mouseDown = false;
            // TODO: Add type to CommandBlock constructor
            new CommandBlock(this.gameState, this.x, this.y, this.h, this.w, this.Color, this.type);
        }
    }

    draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
    }

}

// export function isCommandBlock(obj: object) : obj is CommandBlock {
//     var commandBlockObj : CommandBlock = <CommandBlock>obj;
    
//     return commandBlockObj.mouseDown !== undefined;
// }