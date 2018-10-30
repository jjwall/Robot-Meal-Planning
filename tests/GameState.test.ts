// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const { createCanvas } = require('canvas');
// import { canvas } from "canvas";
// // const testCanvas = createCanvas(200, 200);
// // const ctx = canvas.getContext('2d');
// import { CommandBlock } from "../src/CommandBlock";
import { GameState } from "../src/GameState";
// import { createContext } from "vm";
// import { BaseBlock } from "../src/BaseBlock";
// // import { IGameState } from "../src/IGameState";
// // import canvas from "canvas";

test('constucts an instance of GameState', () => {
    expect(new GameState(
        document.createElement('canvas'))
    ).toBeInstanceOf(GameState);
});