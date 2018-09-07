import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";

export class CommandBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    mouseDown: boolean;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string) {
        super(X, Y, H, W, Color);
        this.gameState = GameState;
        this.mouseDown = false;
        this.gameState.blocks.push(this);
    }

    update() : void {
        if (this.mouseDown) {
            this.x = this.gameState.mouseX - this.w/2;
            this.y = this.gameState.mouseY - this.h/2;
        }
    }

    // onClick() {
    //     console.log(this.color);
    // }
}

// export function isCommandBlock(obj: object) : obj is CommandBlock {
//     var commandBlockObj : CommandBlock = <CommandBlock>obj;
    
//     return commandBlockObj.mouseDown !== undefined;
// }