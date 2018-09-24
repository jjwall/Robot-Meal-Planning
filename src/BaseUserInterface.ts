import { GameState } from "./GameState";

export interface BaseUserInterface {
    gameState: GameState;
    mouseDown: boolean;
    updateDataCallBack: (callCount: number, baseUnits: number, totalUnits: number) => void;
    update() : void;
    draw() : void;
}