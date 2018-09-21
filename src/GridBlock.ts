import { GameState } from "./GameState";
import { BaseBlock } from "./BaseBlock";
import { CommandBlock } from "./CommandBlock";
import { FlowBlock } from "./FlowBlock";
import { CommandTypes, FlowTypes } from "./Enums";

export class GridBlock extends BaseBlock {
    protected gameState: GameState;
    public x: number;
    public y: number;
    readonly h: number;
    readonly w: number;
    public r: number;
    public c: number;
    public commandData: ICommandData;
    public currentCallCount: number;
    public flowType: FlowTypes;
    public call: any; // change type here to generic method signature
    readonly color: string;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Row: number, Column: number, Color: string) {
        super(GameState, X, Y, H, W, Color);
        this.r = Row;
        this.c = Column;
        this.flowType = FlowTypes.Empty;
        this.gameState.blocks.push(this);
        this.commandData = {
            baseUnits: 0,
            totalUnits: 0,
            callCount: 0,
            type: CommandTypes.Empty
        }
    }

    public update() : void {
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
                        if (this.commandData.type === CommandTypes.Empty
                            && block instanceof CommandBlock)
                        {
                            // snap command block to this empty grid square
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            // set commandData and currentCallCount properties
                            this.commandData.type = block.type;
                            this.commandData.baseUnits = block.baseUnits;
                            this.commandData.callCount = block.callCount;
                            this.commandData.totalUnits = block.totalUnits;
                            this.currentCallCount = block.callCount;
                        }
                        else if (this.flowType === FlowTypes.Empty
                                && block instanceof FlowBlock)
                        {
                            block.x = this.x;
                            block.y = this.y;
                            block.set = true;
                            this.flowType = block.type;
                            // set conditional properties here if conditional block
                        }
                    }
                }
            }
        });
    }

    public draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

/**
* Interface to communicate command data.
*/
export interface ICommandData {
    /**
    * Amount of units per call.
    */
    baseUnits: number;
    /**
    * Total units after all call(s).
    */
    totalUnits: number;
    /**
    * Amount of calls for a single pass of execution.
    */
    callCount: number;
    /**
    * Type of command for the execution process.
    */
    type: CommandTypes;
}