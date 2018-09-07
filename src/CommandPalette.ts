import { GameState } from "./main";
import { BaseBlock } from "./BaseBlock";

export class CommandPallete {
    gameState: GameState;
    constructor(GameState: GameState, BlocksHigh: number, BlocksWide: number, BlockColor: string) {
        this.gameState = GameState;
        var yOffset = 5;
        var xOffset = 5;

        for (var i = 0; i < BlocksHigh; i++) {
            for (var j = 0; j < BlocksWide; j++) {
                this.gameState.blocks.push(new GridBlock(xOffset, yOffset, 50, 50, BlockColor));
                xOffset += 55;
            }
            yOffset += 55;
            xOffset = 5;
        }
    } 
}

class GridBlock extends BaseBlock {
    x: number;
    y: number;
    h: number;
    w: number;
    color: string;
    constructor(X: number, Y: number, H: number, W: number, Color: string) {
        super(X, Y, H, W, Color);
    }

    update() : void {
        
    }
}