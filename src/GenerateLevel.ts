import { GameState } from "./GameState";
import { GridBlock } from "./GridBlock";
import { CommandBlockButton } from "./CommandBlock";
import { FlowBlockButton } from "./FlowBlock";
import { CommandBlockTypes, FlowBlockTypes } from "./Enums";

export function GenerateLevel(gameState: GameState, levelObj: object, paletteColor: string) {
    let yOffset: number = 5;
    let xOffset: number = 5;
    let maxXOffset: number = 0;
    let maxYOffset: number = 0;

    // set up grid for Command Palette
    // assign row and column values to grid blocks
    for (var r = 0; r < levelObj["command_palette"]["block_height"]; r++) {
        for (var c = 0; c < levelObj["command_palette"]["block_width"]; c++) {
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
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandBlockTypes.Start);
                break;
            case "move":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandBlockTypes.Move);
                break;
            case "angle":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandBlockTypes.Angle);
                break;
            case "thread":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", CommandBlockTypes.Thread);
                break;
            case "laser":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "green", CommandBlockTypes.Laser);
                break;
            case "scan":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "darkblue", CommandBlockTypes.Scan);
                break;
            case "grapple":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "maroon", CommandBlockTypes.Grapple);
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
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowBlockTypes.Up);
                break;
            case "left":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowBlockTypes.Left);
                break;
            case "right":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowBlockTypes.Right);
                break;
            case "down":
                new FlowBlockButton(gameState, xOffset, yOffset, 50, 50, "yellow", FlowBlockTypes.Down);
                break;
        }
        yOffset += 55;
    }
}