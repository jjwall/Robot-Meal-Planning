import { GameState } from "./main";
import { GridBlock } from "./GridBlock";
import { CommandBlockButton } from "./CommandBlock";

export function LevelCreator(gameState: GameState, levelObj: object, paletteColor: string) {
    let yOffset: number = 5;
    let xOffset: number = 5;
    let maxXOffset: number = 0;
    let maxYOffset: number = 0;

    // set up grid for Command Palette
    for (var i = 0; i < levelObj["command_palette"]["block_height"]; i++) {
        for (var j = 0; j < levelObj["command_palette"]["block_width"]; j++) {
            new GridBlock(gameState, xOffset, yOffset, 50, 50, paletteColor);
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
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", "start");
                break;
            case "move":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", "move");
                break;
            case "angle":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", "angle");
                break;
            case "laser":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "green", "laser");
                break;
            case "scan":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "darkblue", "scan");
                break;
            case "grapple":
                new CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "maroon", "grapple");
                break;
        }
        xOffset += 55;
    }

    // set up Command Path Buttons
}