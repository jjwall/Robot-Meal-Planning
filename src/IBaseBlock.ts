export interface IBaseBlock {
    x: number;
    y: number;
    readonly h: number;
    readonly w: number;
    readonly color: string;
    draw(ctx: CanvasRenderingContext2D): void;
    update(mouseX: number, mouseY: number): void;
}