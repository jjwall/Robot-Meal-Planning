import { BaseBlock } from "./BaseBlock";
import { GridBlock } from "./GridBlock";
import { IBaseUserInterface } from "./IBaseUserInterface";
import { IBaseEntity } from "./IBaseEntity";

export class GameState {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly rect: ClientRect | DOMRect;
    public blocks: BaseBlock[] = [];
    public entities: IBaseEntity[] = [];
    public userInterfaces: IBaseUserInterface[] = [];
    public mouseX: number = 0;
    public mouseY: number = 0;
    public commandControl: boolean = true;
    public flowControl: boolean = false;
    public nextStack: GridBlock[] = [];
    public programRunning: boolean = false;
    constructor(Canvas: HTMLCanvasElement) {
        this.canvas = Canvas;
        this.ctx = Canvas.getContext("2d");
        this.rect = Canvas.getBoundingClientRect();
    }
}