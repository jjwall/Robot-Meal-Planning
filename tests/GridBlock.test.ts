import { GridBlock } from "../src/GridBlock";

test('constucts an instance of GridBlock', () => {
    expect(new GridBlock(
        [],
        10,
        10,
        10,
        10,
        10, 
        10,
        "color"
    )).toBeInstanceOf(GridBlock);
});