import { BaseBlock } from "./BaseBlock";

export interface IGameState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rect: ClientRect | DOMRect;
    blocks: BaseBlock[];
    mouseX: number;
    mouseY: number;
    commandControl: boolean;
    flowControl: boolean;
}