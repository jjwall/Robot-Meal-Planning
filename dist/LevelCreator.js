define(["require", "exports", "./GridBlock", "./CommandBlock", "./Enums"], function (require, exports, GridBlock_1, CommandBlock_1, Enums_1) {
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
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", Enums_1.CommandBlockTypes.Start);
                    break;
                case "move":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", Enums_1.CommandBlockTypes.Move);
                    break;
                case "angle":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "thistle", Enums_1.CommandBlockTypes.Angle);
                    break;
                case "laser":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "green", Enums_1.CommandBlockTypes.Laser);
                    break;
                case "scan":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "darkblue", Enums_1.CommandBlockTypes.Scan);
                    break;
                case "grapple":
                    new CommandBlock_1.CommandBlockButton(gameState, xOffset, yOffset, 50, 50, "maroon", Enums_1.CommandBlockTypes.Grapple);
                    break;
            }
            xOffset += 55;
        }
    }
    exports.LevelCreator = LevelCreator;
});
//# sourceMappingURL=LevelCreator.js.map