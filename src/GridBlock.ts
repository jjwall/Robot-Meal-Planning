import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";
import { CommandBlock } from "./CommandBlock";
import { FlowBlock } from "./FlowBlock";

export class GridBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    h: number;
    w: number;
    commandEmpty: boolean
    flowEmpty: boolean
    color: string;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Color: string) {
        super(GameState, X, Y, H, W, Color);
        this.commandEmpty = true;
        this.flowEmpty = true;
        this.gameState.blocks.push(this);
    }

    update() : void {
        // see if command block is being dropped on empty grid block
        this.gameState.blocks.forEach(block => {
            if (block instanceof CommandBlock
                || block instanceof FlowBlock) {
                if (block.mouseDown === false) {
                    if (block.x < this.x + this.w &&
                        block.x + block.w > this.x &&
                        block.y < this.y + this.h &&
                        block.h + block.y > this.y)
                    {
                        if (this.commandEmpty
                            && block instanceof CommandBlock)
                        {
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            this.commandEmpty = false;
                        }
                        else if (this.flowEmpty
                                && block instanceof FlowBlock)
                        {
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            this.flowEmpty = false;
                        }
                    }
                }
            }
        })
    }

    draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}