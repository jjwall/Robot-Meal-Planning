// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const { createCanvas } = require('canvas');
// import { canvas } from "canvas";
// // const testCanvas = createCanvas(200, 200);
// // const ctx = canvas.getContext('2d');
// import { CommandBlock } from "../src/CommandBlock";
// import { GameState } from "../src/main";
// import { createContext } from "vm";
// import { BaseBlock } from "../src/BaseBlock";
// // import { IGameState } from "../src/IGameState";
// // import canvas from "canvas";

// test('constucts an instance of GameState', () => {
//     // const doc = (new JSDOM()).document;
//     const createElement = document.createElement;
//     const FAKECanvasElement = {
//     getContext: jest.fn(() => {
//         return {
//         fillStyle: null,
//         fillRect: jest.fn(),
//         drawImage: jest.fn(),
//         getImageData: jest.fn(),
//         };
//     }),
//     };
//     expect(new GameState({
//         canvas: document.createElement('canvas'),
//         ctx: FAKECanvasElement.getContext(),//document.createElement('canvas').getContext('2d'),
//         rect: document.createElement('canvas').getBoundingClientRect(),
//         blocks: [],
//         mouseX: 0,
//         mouseY: 0,
//         commandControl: true,
//         flowControl: false
//     })).toBeInstanceOf(GameState);
// });