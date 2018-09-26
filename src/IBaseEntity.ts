export interface IBaseEntity {
    x: number;
    y: number;
    h: number;
    w: number;
    update() : void;
    draw() : void;
}