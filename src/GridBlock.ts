import { GameState } from "./GameState";
import { BaseBlock } from "./BaseBlock";
import { CommandBlock } from "./CommandBlock";
import { FlowBlock } from "./FlowBlock";
import { CommandBlockTypes, FlowBlockTypes } from "./Enums";

export class GridBlock extends BaseBlock {
    gameState: GameState;
    x: number;
    y: number;
    h: number;
    w: number;
    r: number;
    c: number;
    commandType: CommandBlockTypes;
    flowType: FlowBlockTypes;
    call: any;
    callCount: number;
    color: string;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Row: number, Column: number, Color: string) {
        super(GameState, X, Y, H, W, Color);
        this.r = Row;
        this.c = Column;
        this.commandType = CommandBlockTypes.Empty;
        this.flowType = FlowBlockTypes.Empty;
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
                        if (this.commandType === CommandBlockTypes.Empty
                            && block instanceof CommandBlock)
                        {
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            this.commandType = block.type;
                        }
                        else if (this.flowType === FlowBlockTypes.Empty
                                && block instanceof FlowBlock)
                        {
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            this.flowType = block.type;
                        }
                    }
                }
            }
        });
    }

    draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}