import { GameState } from "./main";

export class CommandPallete {
    // squaresHigh: number;
    // squaresWide: number;
    gameState: GameState;
    constructor(GameState: GameState, SquaresHigh: number, SquaresWide: number, SquareColor: string) {
        this.gameState = GameState;
        var yOffset = 5;
        var xOffset = 5;

        for (var i = 0; i < SquaresHigh; i++) {
            for (var j = 0; j < SquaresWide; j++) {
                this.gameState.entities.push(new GridSquare(xOffset, yOffset, SquareColor));
                xOffset += 55;
            }
            yOffset += 55;
            xOffset = 5;
        }
    } 
}

class GridSquare {
    x: number;
    y: number;
    h: number;
    w: number;
    color: string;
    constructor(X: number, Y: number, Color: string) {
        this.x = X;
        this.y = Y;
        this.h = 50;
        this.w = 50;
        this.color = Color;
    }

    update() : void {
        
    }
}