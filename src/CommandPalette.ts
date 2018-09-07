import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";
import { CommandBlock } from "./CommandBlock";

export class CommandPallete {
    gameState: GameState;
    constructor(GameState: GameState, BlocksHigh: number, BlocksWide: number, BlockColor: string) {
        this.gameState = GameState;
        var yOffset = 5;
        var xOffset = 5;

        for (var i = 0; i < BlocksHigh; i++) {
            for (var j = 0; j < BlocksWide; j++) {
                new GridBlock(this.gameState, xOffset, yOffset, 50, 50, BlockColor);
                xOffset += 55;
            }
            yOffset += 55;
            xOffset = 5;
        }
    } 
}

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