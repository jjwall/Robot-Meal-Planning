import { GameState } from "./GameState";
import { GridBlock } from "./GridBlock";
import { CommandBlockButton } from "./CommandBlock";
import { FlowBlockButton } from "./FlowBlock";
import { CommandTypes, FlowTypes } from "./Enums";
import { Slider } from "./Slider";
import { ThreadObserver } from "./ThreadObserver";
import { PlusMinus } from "./PlusMinus";

export function GenerateLevel(gameState: GameState, levelObj: object, paletteColor: string) {
    let yOffset: number = 5;
    let xOffset: number = 5;
    let maxXOffset: number = 0;
    let maxYOffset: number = 0;
    let commandPaletteH: number = levelObj["command_palette"]["block_height"];
    let commandPaletteW: number = levelObj["command_palette"]["block_width"]

    // set up grid for Command Palette
    // assign row and column values to grid blocks
    for (var r = 0; r < commandPaletteH; r++) {
        for (var c = 0; c < commandPaletteW; c++) {
            new GridBlock(gameState, xOffset, yOffset, 50, 50, r, c, paletteColor);
            xOffset += 55;
        }
        yOffset += 55;
        maxXOffset = xOffset;
        xOffset = 5;
    }

    maxYOffset = yOffset;
    yOffset = maxYOffset + 20;

    // set up Command Block Buttons
    // CONSIDER: Accommodating for command palette width
    for (var i = 0; i < levelObj["command_blocks"].length; i ++) {
        switch(levelObj["command_blocks"][i]) {
            case "start":
                let startBlock = new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandTypes.Start);
                new ThreadObserver(gameState, startBlock.x, startBlock.y, startBlock.h, startBlock.w, startBlock.updateData);
                break;
            case "move":
                let moveBlock = new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandTypes.Move);
                // set up slider, pass in reference to move callback
                new Slider(gameState, xOffset + 20, yOffset + 60, 100, .5, CommandTypes.Move, moveBlock.updateData);
                break;
            case "angle":
                let angleBlock = new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandTypes.Angle);
                // set up slider, pass in reference to angle callback
                new Slider(gameState, xOffset + 20, yOffset + 60, 360, 1, CommandTypes.Angle, angleBlock.updateData, 8);
                break;
            case "thread":
                let threadBlock = new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandTypes.Thread);
                new PlusMinus(gameState, 175, 360, threadBlock.updateData);
                break;
            case "laser":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "green", CommandTypes.Laser);
                break;
            case "scan":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "darkblue", CommandTypes.Scan);
                break;
            case "grapple":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "maroon", CommandTypes.Grapple);
                break;
        }
        xOffset += 55;
    }

    xOffset = maxXOffset + 20;
    yOffset = 5;

    // set up Flow Block Buttons
    // CONSIDER: Accommodating for command palette height
    for (var i = 0; i < levelObj["flow_blocks"].length; i ++) {
        switch(levelObj["flow_blocks"][i]) {
            case "up":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowTypes.Up);
                break;
            case "left":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowTypes.Left);
                break;
            case "right":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowTypes.Right);
                break;
            case "down":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowTypes.Down);
                break;
        }
        yOffset += 55;
    }
}