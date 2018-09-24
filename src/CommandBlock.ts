import { GameState } from "./GameState";
import { BaseBlock } from "./BaseBlock";
import { CommandTypes } from "./Enums";
import { ICommandData, GridBlock } from "./GridBlock";

export class CommandBlock extends BaseBlock implements ICommandData {
    protected gameState: GameState;
    public x: number;
    public y: number;
    readonly w: number;
    readonly h: number;
    readonly baseUnits: number;
    readonly callCount: number;
    public totalUnits: number;
    readonly color: string;
    public mouseDown: boolean;
    public set: boolean;
    readonly type: CommandTypes;
    readonly image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Units: number, CallCount: number, Color: string, Type: CommandTypes) {
        super(GameState, X, Y, H, W, Color);
        this.baseUnits = Units;
        this.callCount = CallCount;
        this.totalUnits = this.baseUnits * this.callCount;
        this.mouseDown = true;
        this.set = false;
        this.type = Type;
        this.image = new Image();
        switch(Type) {
            case CommandTypes.Start:
                this.image.src = "data/textures/StartBlock.png";
                break;
            case CommandTypes.Move:
                this.image.src = "data/textures/MoveBlock.png";
                break;
            case CommandTypes.Angle:
                this.image.src = "data/textures/AngleBlock.png";
                break;
            case CommandTypes.Thread:
                this.image.src = "data/textures/ThreadBlock.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    /**
     * method called in SetUpEventListeners.ts
     */
    public mouseUp() : void {
        // i.e. dropping block
        this.gameState.blocks.forEach(block => {
            if (block instanceof GridBlock && block.commandData.type === CommandTypes.Empty) {
                if (block.x < this.x + this.w &&
                    block.x + block.w > this.x &&
                    block.y < this.y + this.h &&
                    block.h + block.y > this.y)
                {
                    // snap this command block to empty GridBlock
                    this.x = block.x;
                    this.y = block.y;
                    this.set = true;
                    // set GridBlock's commandData and currentCallCount properties
                    block.commandData.type = this.type;
                    block.commandData.baseUnits = this.baseUnits;
                    block.commandData.callCount = this.callCount;
                    block.commandData.totalUnits = this.totalUnits;
                    block.currentCallCount = this.callCount;
                }
            }
        });

        // delete if dropping block and it doesn't have a empty grid block to be set on
        if (!this.set) {
            var index = this.gameState.blocks.indexOf(this);
            this.gameState.blocks.splice(index, 1);
        }
    }

    public update() : void {
        // drag command block
        if (this.mouseDown) {
            this.x = this.gameState.mouseX - this.w/2;
            this.y = this.gameState.mouseY - this.h/2;
            this.set = false;
        }
    }

    public draw() : void {
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

// CONSIDER: extending CommandBlock class
export class CommandBlockButton extends BaseBlock implements ICommandData {
    protected gameState: GameState;
    public x: number;
    public y: number;
    readonly w: number;
    readonly h: number;
    public baseUnits: number;
    public callCount: number;
    public totalUnits: number;
    readonly color: string;
    public mouseDown: boolean;
    readonly type: CommandTypes;
    readonly image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: CommandTypes) {
        super(GameState, X, Y, H, W, Color);
        this.mouseDown = false;
        this.type = Type;
        this.image = new Image();
        this.baseUnits = 0;
        this.callCount = 0;
        this.totalUnits = 0;
        switch(Type) {
            case CommandTypes.Start:
                this.image.src = "data/textures/StartBlock.png";
                break;
            case CommandTypes.Move:
                this.image.src = "data/textures/MoveBlock.png";
                break;
            case CommandTypes.Angle:
                this.image.src = "data/textures/AngleBlock.png";
                break;
            case CommandTypes.Thread:
                this.image.src = "data/textures/ThreadBlock.png";
                break;
        }
        this.gameState.blocks.push(this);
    }

    /**
     * Callback function to be passed in as reference to corresponding UI.
     */
    public updateData = (multiplicative: number, baseUnits: number): void => {
        this.callCount = multiplicative;
        this.baseUnits = baseUnits;
        this.totalUnits = this.baseUnits * this.callCount;
    }

    public update() : void {
        if (this.mouseDown) {
            this.mouseDown = false;
            new CommandBlock(this.gameState, this.x, this.y, this.h, this.w, this.baseUnits, this.callCount, this.Color, this.type);
        }
    }

    public draw() : void {
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