import { GridBlock } from "../src/GridBlock";

describe('GridBlock', () => {
    let g: GridBlock;

    beforeEach(() => {
        g = new GridBlock([], 10, 10, 10, 10, 10, 10, "color");
    });

    it("constructs", () => {
        expect(g).toBeInstanceOf(GridBlock);
        expect(g.x).toBe(10);
        expect(g.y).toBe(10);
        expect(g.h).toBe(10);
        expect(g.w).toBe(10);
        expect(g.r).toBe(10);
        expect(g.c).toBe(10);
        expect(g.color).toBe("color");
    });

    it("draws to canvas", () => {
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        g.draw(ctx);
    });

    it("updates", () => {
        let copiedG = new GridBlock([], 10, 10, 10, 10, 10, 10, "color");
        g.update();
        // test state is the same since we update currently doesn't do anything
        expect(copiedG).toEqual(g);
    });
});