import { GameState } from "./main";
import { GridBlock } from "./GridBlock";
import { CommandBlockButton } from "./CommandBlock";
import { CommandBlockTypes } from "./Enums";

export function LevelCreator(gameState: GameState, levelObj: object, paletteColor: string) {
    let yOffset: number = 5;
    let xOffset: number = 5;
    let maxXOffset: number = 0;
    let maxYOffset: number = 0;

    // set up grid for Command Palette
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

    // set up Flow Block Buttons
}