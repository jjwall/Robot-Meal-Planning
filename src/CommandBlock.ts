import { GameState } from "./main";

export class CommandBlock {
    gameState: GameState;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    mouseDown: boolean;
    constructor(GameState, X, Y, Color) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.w = 50;
        this.h = 50;
        this.color = Color;
        this.mouseDown = false;
    }

    update() : void {
        if (this.mouseDown) {
            this.x = this.gameState.mouseX - this.w/2;
            this.y = this.gameState.mouseY - this.h/2;
        }
    }

    // onClick() {
    //     console.log(this.color);
    // }
}