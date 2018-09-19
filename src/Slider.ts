import { GameState } from "./GameState";

// add command and conditional types as a param and to Enums.ts
// add to GenerateLevel
// maybe add support for thread starter?
export class Slider {
    gameState: GameState;
    mouseDown: boolean;
    snapAmount: number;
    percentage: number;
    value: number;
    sliderX: number;
    sliderY: number;
    sliderH: number;
    sliderW: number;
    sliderColor: string;
    barX: number;
    barY: number;
    barH: number;
    barW: number;
    barColor: string;
    constructor(GameState: GameState, X :number, Y: number, SnapAmount: number = 10) {
        this.gameState = GameState;
        this.mouseDown = false;
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
        this.snapAmount = SnapAmount;
        this.percentage = 1 - (this.sliderY - this.barY + this.sliderH/2) / this.barH;
        this.value = Math.round(this.percentage * this.snapAmount) / this.snapAmount;
    }

    update() : void {
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
                console.log(this.value);
            }
        }
    }

    draw() : void {
        // draw bar
        this.gameState.ctx.fillStyle = this.barColor;
        this.gameState.ctx.fillRect(this.barX, this.barY, this.barW, this.barH);

        // draw slider
        this.gameState.ctx.fillStyle = this.sliderColor;
        this.gameState.ctx.fillRect(this.sliderX - this.sliderH/4, this.sliderY, this.sliderW, this.sliderH);
    }
}