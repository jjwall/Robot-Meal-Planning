import { BaseBlock } from "./BaseBlock";
import { GridBlock } from "./GridBlock";
import { Slider } from "./Slider";
import { BaseUserInterface } from "./BaseUserInterface";

export class GameState {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly rect: ClientRect | DOMRect;
    public blocks: BaseBlock[];
    public userInterfaces: BaseUserInterface[];
    public mouseX: number;
    public mouseY: number;
    public commandControl: boolean;
    public flowControl: boolean;
    public nextStack: GridBlock[];
    public programRunning: boolean;
    constructor(obj?: IGameState) {
        this.canvas = obj && obj.canvas || <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = obj && obj.ctx || <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.rect = obj && obj.rect || <ClientRect | DOMRect> this.canvas.getBoundingClientRect();
        this.blocks = obj && obj.blocks || [];
        this.userInterfaces = obj && obj.userInterfaces || [];
        this.mouseX = obj && obj.mouseX || 0;
        this.mouseY = obj && obj.mouseY || 0;
        this.commandControl = obj && obj.commandControl || true;
        this.flowControl = obj && obj.flowControl || false;
        this.nextStack = obj && obj.nextStack || [];
        this.programRunning = obj && obj.programRunning || false;
    }
}

export interface IGameState {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    userInterfaces: BaseUserInterface[];
    mouseX: number;
    mouseY: number;
    commandControl: boolean;
    flowControl: boolean;
    nextStack: any[];
    programRunning: boolean;
}