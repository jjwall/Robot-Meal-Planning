import { CommandBlock } from "../src/CommandBlock";
import { GameState } from "../src/main";

test('constructs an instance of CommandBlock', () => {
    expect(new CommandBlock(new GameState(), 5, 5, 5, 5, "black"));
});