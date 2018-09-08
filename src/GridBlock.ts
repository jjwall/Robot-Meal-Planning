import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";
import { CommandBlock } from "./CommandBlock";

export class GridBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    h: number;
    w: number;
    empty: boolean
    color: string;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string) {
        super(GameState, X, Y, H, W, Color);
        this.empty = true;
        this.gameState.blocks.push(this);
    }

    update() : void {
        // see if command block is being dropped on empty grid block
        this.gameState.blocks.forEach(block => {
            if (block instanceof CommandBlock) {
                if (block.mouseDown === false) {
                    if (block.x < this.x + this.w &&
                        block.x + block.w > this.x &&
                        block.y < this.y + this.h &&
                        block.h + block.y > this.y)
                    {
                        if (this.empty) {
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            this.empty = false;
                        }
                    }
                }
            }
        })
    }
}