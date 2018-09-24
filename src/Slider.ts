import { GameState } from "./GameState";
import { CommandTypes, FlowTypes } from "./Enums";
import { BaseUserInterface } from "./BaseUserInterface";

// maybe add support for thread starter?
export class Slider implements BaseUserInterface {
    public gameState: GameState;
    public mouseDown: boolean;
    private snapAmount: number;
    private percentage: number;
    public value: number;
    public updateDataCallBack: (callCount: number, baseUnits: number, totalUnits: number) => void;
    readonly maxUnits: number;
    readonly baseUnits: number;
    private totalUnits: number;
    readonly type: CommandTypes | FlowTypes;
    public sliderX: number;
    public sliderY: number;
    readonly sliderH: number;
    readonly sliderW: number;
    readonly sliderColor: string;
    public barX: number;
    public barY: number;
    readonly barH: number;
    readonly barW: number;
    readonly barColor: string;
    constructor(GameState: GameState, X :number, Y: number, MaxUnits: number, Type: CommandTypes | FlowTypes, UpdateDataCallBack: (callCount: number, baseUnits: number, totalUnits: number) => void, SnapAmount: number = 10) {
        this.gameState = GameState;
        this.mouseDown = false;
        this.maxUnits = MaxUnits;
        this.snapAmount = SnapAmount;
        this.updateDataCallBack = UpdateDataCallBack;
        this.baseUnits = Math.round(this.maxUnits / this.snapAmount);
        this.type = Type;
        this.barH = 75;
        this.barW = 10;
        this.barX = X;
        this.barY = Y;
        this.barColor = "thistle";
        this.sliderH = 10;
        this.sliderW = 15;
        this.sliderX = X;
        this.sliderY = Y + this.barH/2 - this.sliderH/2;
        this.sliderColor = "purple";
        this.percentage = 1 - (this.sliderY - this.barY + this.sliderH/2) / this.barH;
        this.value = Math.round(this.percentage * this.snapAmount) / this.snapAmount;
        
        let calculatedCallCount = Math.round((this.value * this.maxUnits)/this.baseUnits);
        this.totalUnits = calculatedCallCount * this.baseUnits;

        this.gameState.userInterfaces.push(this);
        
        // initialize data
        this.updateDataCallBack(calculatedCallCount, this.baseUnits, this.totalUnits);
    }

    public update() : void {
        if (this.mouseDown) {
            if (this.barY - this.sliderH/2 < this.gameState.mouseY &&
                this.barY + this.barH - this.sliderH/2 > this.gameState.mouseY)
            {
                const tempSliderY = this.gameState.mouseY;
                // find percentage slider is up vertical on bar
                this.percentage = 1 - (tempSliderY - this.barY + this.sliderH/2) / this.barH;
                // set the value to be the rounded percentage based on snap amount
                this.value = Math.round(this.percentage * this.snapAmount) / this.snapAmount;
                // set sliderY value based on new value from the rounded percantage
                this.sliderY = this.barH + this.barY - (this.sliderH/2) - (this.value * this.barH);

                let calculatedCallCount = Math.round((this.value * this.maxUnits)/this.baseUnits);

                this.totalUnits = calculatedCallCount * this.baseUnits

                this.updateDataCallBack(calculatedCallCount, this.baseUnits, this.totalUnits);
            }
        }
    }

    public draw() : void {
        // draw bar
        this.gameState.ctx.fillStyle = this.barColor;
        this.gameState.ctx.fillRect(this.barX, this.barY, this.barW, this.barH);

        // draw slider
        this.gameState.ctx.fillStyle = this.sliderColor;
        this.gameState.ctx.fillRect(this.sliderX - this.sliderH/4, this.sliderY, this.sliderW, this.sliderH);
    }
}