import { IBaseEntity } from "IBaseEntity";
import { GameState } from "./GameState";

export class Robot implements IBaseEntity {
    protected gameState: GameState;
    public x: number;
    public y: number;
    public h: number;
    public w: number;
    public angle: number;
    readonly color: string;
    readonly image: HTMLImageElement;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.angle = 0;
        this.color = "grey";
        this.image = new Image();
        this.image.src = "data/textures/RobotGun.png";
    }

    public update() : void {

    }

    public draw() : void {
        this.gameState.ctx.translate(this.x, this.y);
        this.gameState.ctx.rotate(this.angle * Math.PI/180);
        this.gameState.ctx.fillStyle = this.color;
        this.gameState.ctx.fillRect(-this.h/2, -this.w/2, this.w, this.h);
        this.gameState.ctx.drawImage(this.image, -this.w/2, -this.h/2);
        this.gameState.ctx.rotate(-(this.angle * Math.PI/180));
        this.gameState.ctx.translate(-this.x, -this.y);
    }

    public move(distance: number) : void {
        let x2 = Math.cos(this.angle * Math.PI/180) * distance;
        let y2 = Math.sin(this.angle * Math.PI/180) * distance;
        this.x += x2;
        this.y += y2;
    }

    public turnClockWise(degrees: number) : void {
        this.angle += degrees;
    }
}