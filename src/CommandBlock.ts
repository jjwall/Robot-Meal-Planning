import { GameState } from "./GameState";
import { BaseBlock } from "./BaseBlock";
import { CommandBlockTypes } from "./Enums";

export class CommandBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    readonly units: number;
    readonly callCount: number;
    readonly totalUnits: number;
    color: string;
    mouseDown: boolean;
    set: boolean;
    type: CommandBlockTypes;
    image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Units: number, CallCount: number, Color: string, Type: CommandBlockTypes) {
        super(GameState, X, Y, H, W, Color);
        this.units = Units;
        this.callCount = CallCount;
        this.totalUnits = this.units * this.callCount;
        this.mouseDown = true;
        this.set = false;
        this.type = Type;
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
            case CommandBlockTypes.Thread:
                this.image.src = "data/textures/ThreadBlock.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    update() : void {
        // drag command block
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
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
        this.gameState.ctx.fillStyle = "black";
        this.gameState.ctx.font = "15px Arial";
        let offsetX = 30;

        if (this.totalUnits > 99) {
            offsetX = 25;
        }
        else if (this.totalUnits < 10) {
            offsetX = 35;
        }

        this.gameState.ctx.fillText((this.totalUnits).toString(), this.x + offsetX, this.y + 48);
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
    units: number;
    callCount: number;
    totalUnits: number;
    color: string;
    mouseDown: boolean;
    type: CommandBlockTypes;
    image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: CommandBlockTypes) {
        super(GameState, X, Y, H, W, Color);
        this.mouseDown = false;
        this.type = Type;
        this.image = new Image();
        this.units = 0;
        this.callCount = 0;
        this.totalUnits = 0;
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
            case CommandBlockTypes.Thread:
                this.image.src = "data/textures/ThreadBlock.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    update() : void {
        this.gameState.sliders.forEach(slider => {
            if (slider.type === this.type) {
                this.callCount = Math.round((slider.value * slider.maxUnits)/slider.baseUnits);
                this.units = slider.baseUnits;
                this.totalUnits = this.units * this.callCount;
            }
        });

        if (this.mouseDown) {
            this.mouseDown = false;
            new CommandBlock(this.gameState, this.x, this.y, this.h, this.w, this.units, this.callCount, this.Color, this.type);
        }
    }

    draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.drawImage(this.image, 0, 0);
        this.gameState.ctx.translate(-this.x, -this.y);
        this.gameState.ctx.fillStyle = "black";
        this.gameState.ctx.font = "15px Arial";
        let offsetX = 30;

        if (this.totalUnits > 99) {
            offsetX = 25;
        }

        else if (this.totalUnits < 10) {
            offsetX = 35;
        }
        
        this.gameState.ctx.fillText((this.totalUnits).toString(), this.x + offsetX, this.y + 48);
    }

}

// export function isCommandBlock(obj: object) : obj is CommandBlock {
//     var commandBlockObj : CommandBlock = <CommandBlock>obj;
    
//     return commandBlockObj.mouseDown !== undefined;
// }