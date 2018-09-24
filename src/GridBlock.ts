import { GameState } from "./GameState";
import { BaseBlock } from "./BaseBlock";
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