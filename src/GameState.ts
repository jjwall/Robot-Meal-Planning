import { BaseBlock } from "./BaseBlock";
import { GridBlock } from "./GridBlock";

export class GameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    commandControl: boolean;
    flowControl: boolean;
    callStack: GridBlock[];
    nextCall: GridBlock[];
    programRunning: boolean;
    constructor(obj?: IGameState) {
        this.canvas = obj && obj.canvas || <HTMLCanvasElement> document.getElementById("gameScreen");
        this.ctx = obj && obj.ctx || <CanvasRenderingContext2D> this.canvas.getContext("2d");
        this.rect = obj && obj.rect || <ClientRect | DOMRect> this.canvas.getBoundingClientRect();
        this.blocks = obj && obj.blocks || [];
        this.mouseX = obj && obj.mouseX || 0;
        this.mouseY = obj && obj.mouseY || 0;
        this.commandControl = obj && obj.commandControl || true;
        this.flowControl = obj && obj.flowControl || false;
        this.callStack = obj && obj.callStack || [];
        this.nextCall = obj && obj.nextCall || [];
        this.programRunning = obj && obj.programRunning || false;
    }
}

export interface IGameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    commandControl: boolean;
    flowControl: boolean;
    callStack: any[];
    nextCall: any[];
    programRunning: boolean;
}