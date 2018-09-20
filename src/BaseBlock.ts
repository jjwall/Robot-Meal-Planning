import { GameState } from "./GameState";

export abstract class BaseBlock {
    protected gameState: GameState;
    public x: number;
    public y: number;
    readonly h: number;
    readonly w: number;
    readonly color: string;
    constructor(public GameState: GameState,
                public X: number,
                public Y: number,
                public H: number,
                public W: number,
                public Color: string) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.color = Color;
    }

    draw(): void {} 
    update(): void {}
}