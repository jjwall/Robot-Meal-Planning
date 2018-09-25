import { BaseUserInterface } from "./BaseUserInterface";
import { GameState } from "./GameState";

export class PlusMinus implements BaseUserInterface {
    gameState: GameState;
    mouseDown: boolean;
    plusX: number;
    plusY: number;
    plusH: number;
    plusW: number;
    mouseDownPlus: boolean;
    minusX: number;
    minusY: number;
    minusH: number;
    minusW: number;
    mouseDownMinus: boolean;
    targetThread: number;
    color: string;
    updateDataCallBack: (callCount: number, baseUnits: number, totalUnits: number) => void;
    constructor(GameState: GameState, X: number, Y: number, UpdateDataCallBack: (callCount: number, baseUnits: number, totalUnits: number) => void) {
        this.gameState = GameState;
        this.minusX = X;
        this.minusY = Y;
        this.minusH = 10;
        this.minusW = 15;
        this.plusX = X + 25;
        this.plusY = Y;
        this.plusH = 10;
        this.plusW = 15;
        this.updateDataCallBack = UpdateDataCallBack;
        this.color = "purple";
        this.mouseDown = false;
        this.mouseDownMinus = false;
        this.mouseDownPlus = false;
        this.targetThread = 1;
        this.updateDataCallBack(0, 1, this.targetThread);

        this.gameState.userInterfaces.push(this);
    }
    update() : void {
        if (this.mouseDownPlus) {
            this.mouseDownPlus = false;
            this.mouseDown = false;
            this.targetThread++;
            this.updateDataCallBack(0, 1, this.targetThread)
        }
        else if (this.mouseDownMinus) {
            this.mouseDownMinus = false;
            this.mouseDown = false;

            if (this.targetThread > 1) {
                this.targetThread--;
                this.updateDataCallBack(0, 1, this.targetThread);
            }
        }

        if (!this.mouseDown) {
            this.mouseDownMinus = false;
            this.mouseDownPlus = false;
        }
    }
    draw() : void {
        // draw minus
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.minusX, this.minusY, this.minusW, this.minusH);

        // draw plus
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(this.plusX, this.plusY, this.plusW, this.plusH);

        // draw -/+
        this.gameState.ctx.fillStyle = "thistle";
        this.gameState.ctx.font = "17px Arial";
        this.gameState.ctx.fillText("-", this.minusX + this.minusW/3, this.minusY + this.minusH);
        this.gameState.ctx.fillText("+", this.plusX + this.plusW/4 - 1, this.plusY + this.plusH + 1);
    }
}