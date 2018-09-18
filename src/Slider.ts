import { GameState } from "./GameState";

// to do make sure min / max percentages can be reached
// add command and conditional types as a param and to Enums.ts
// add optional param for "sticky" values separating in variable amount
// maybe add support for thread starter?
export class Slider {
    gameState: GameState;
    mouseDown: boolean;
    percentage: number;
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
    constructor(GameState: GameState, X :number, Y: number) {
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
        this.percentage = 1 - (this.sliderY - this.barY + this.sliderH/2) / this.barH;
    }

    update() : void {
        if (this.mouseDown) {
            if (this.barY - this.sliderH/2 < this.gameState.mouseY &&
                this.barY + this.barH - this.sliderH/2 > this.gameState.mouseY)
            {
                this.sliderY = this.gameState.mouseY;
                this.percentage = 1 - (this.sliderY - this.barY + this.sliderH/2) / this.barH;
            }
        }
        // console.log(this.percentage);
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