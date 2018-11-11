import { GameState } from "./GameState";
import { IBaseBlock } from "./IBaseBlock";
import { CommandTypes, FlowTypes } from "./Enums";

export class GridBlock implements IBaseBlock {
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
    public call: () => void;
    readonly color: string;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, Row: number, Column: number, Color: string) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.color = Color;
        this.r = Row;
        this.c = Column;
        this.flowType = FlowTypes.Empty;
        this.gameState.blocks.push(this);
        this.commandData = {
            baseUnits: 0,
            totalUnits: 0,
            unitsPerCall: 0,
            callCount: 0,
            type: CommandTypes.Empty
        }
    }

    public draw() : void {
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    public update() : void {}
}

/**
* Interface to communicate command data.
*/
export interface ICommandData {
    /**
    * Minimum amount of units per execution and common denominator.
    */
    baseUnits: number;
    /**
     * Units per call.
     */
    unitsPerCall: number;
    /**
    * Total units after pass of execution i.e. after all call(s).
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