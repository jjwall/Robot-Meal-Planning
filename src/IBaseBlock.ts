export interface IBaseBlock {
    x: number;
    y: number;
    readonly h: number;
    readonly w: number;
    readonly color: string;
    draw(): void;
    update(): void;
}