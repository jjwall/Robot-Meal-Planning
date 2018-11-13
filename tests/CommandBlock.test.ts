import { CommandBlock } from "../src/CommandBlock";
import { CommandTypes } from "../src/Enums";

describe('CommandBlock', () => {
    let c: CommandBlock;

    // beforeEach(() => {
    //     c = new CommandBlock([], 10, 10, 10, 10, 10, 10, 10, 10, "color", CommandTypes.Angle)
    // });

    it('constructs an angle command block', () => {
        c = new CommandBlock([], 10, 10, 10, 10, 10, 10, 10, 10, "color", CommandTypes.Angle)
        expect(c).toBeInstanceOf(CommandBlock);
        expect(c.x).toBe(10);
        expect(c.y).toBe(10);
        expect(c.h).toBe(10);
        expect(c.w).toBe(10);
        expect(c.baseUnits).toBe(10);
        expect(c.callCount).toBe(10);
        expect(c.totalUnits).toBe(10);
        expect(c.unitsPerCall).toBe(10);
        expect(c.color).toEqual("color");
        expect(c.image.src).toContain("data/textures/AngleBlock.png");
    });
});