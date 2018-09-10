define(["require", "exports", "./GridBlock", "./CommandBlock"], function (require, exports, GridBlock_1, CommandBlock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function LevelCreator(gameState, levelObj, paletteColor) {
        var yOffset = 5;
        var xOffset = 5;
        var maxXOffset = 0;
        var maxYOffset = 0;
        for (var i = 0; i < levelObj["command_palette"]["block_height"]; i++) {
            for (var j = 0; j < levelObj["command_palette"]["block_width"]; j++) {
                new GridBlock_1.GridBlock(gameState, xOffset, yOffset, 50, 50, paletteColor);
                xOffset += 55;
            }
            yOffset += 55;
            maxXOffset = xOffset;
            xOffset = 5;
        }
        maxYOffset = yOffset;
        yOffset = maxYOffset + 20;
        for (var i = 0; i < levelObj["command_blocks"].length; i++) {
            switch (levelObj["command_blocks"][i]) {
                case "start":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", "start");
                    break;
                case "move":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", "move");
                    break;
                case "angle":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", "angle");
                    break;
                case "laser":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "green", "laser");
                    break;
                case "scan":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "darkblue", "scan");
                    break;
                case "grapple":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "maroon", "grapple");
                    break;
            }
            xOffset += 55;
        }
    }
    exports.LevelCreator = LevelCreator;
});
//# sourceMappingURL=LevelCreator.js.map