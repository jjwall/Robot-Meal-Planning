/// <reference path="../src/declarations/node-canvas.d.ts" />

import { CommandBlock } from "../src/CommandBlock";
import { GameState } from "../src/main";
import canvas from "canvas";

test('constructs an instance of CommandBlock', () => {
    expect(new CommandBlock(new GameState(), 5, 5, 5, 5, "black"));
});