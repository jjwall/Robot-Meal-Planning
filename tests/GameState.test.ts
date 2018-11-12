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
    let gs = new GameState(document.createElement('canvas'));
    expect(gs).toBeInstanceOf(GameState);
    expect(gs.blocks).toEqual([]);
    expect(gs.entities).toEqual([]);
    expect(gs.userInterfaces).toEqual([]);
    expect(gs.mouseX).toBe(0);
    expect(gs.mouseY).toBe(0);
    expect(gs.commandControl).toBeTruthy();
    expect(gs.flowControl).toBeFalsy();
    expect(gs.nextStack).toEqual([]);
    expect(gs.programRunning).toBeFalsy();
});