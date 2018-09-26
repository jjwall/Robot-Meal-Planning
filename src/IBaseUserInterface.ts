import { GameState } from "./GameState";

export interface IBaseUserInterface {
    gameState: GameState;
    mouseDown: boolean;
    updateDataCallBack: (callCount: number, baseUnits: number, totalUnits: number) => void;
    update() : void;
    draw() : void;
}