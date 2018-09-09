import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";

export class FlowBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    mouseDown: boolean;
    set: boolean;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string) {
        super(GameState, X, Y, H, W, Color);
        this.gameState = GameState;
        this.mouseDown = true;
        this.set = false;
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
}

export class FlowBlockButton extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    mouseDown: boolean;
    type: string;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string, Type: string) {
        super(GameState, X, Y, H, W, Color);
        this.type = Type;
        this.mouseDown = false;
        this.gameState.blocks.push(this);
    }
    update () : void {
        if (this.mouseDown) {
            this.mouseDown = false;
            // TODO: Add type to FlowBlock constructor
            new FlowBlock(this.gameState, this.x, this.y, this.h, this.w, this.Color);
        }
    }
}