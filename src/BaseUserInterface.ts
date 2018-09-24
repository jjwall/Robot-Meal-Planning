import { GameState } from "./GameState";

export interface BaseUserInterface {
    gameState: GameState;
    maxUnits: number;
    baseUnits: number;
    mouseDown: boolean;
    updateDataCallBack: (multiplicative: number, baseUnits: number) => void;
    update() : void;
    draw() : void;
}