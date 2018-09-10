define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandBlockTypes;
    (function (CommandBlockTypes) {
        CommandBlockTypes[CommandBlockTypes["Empty"] = 0] = "Empty";
        CommandBlockTypes[CommandBlockTypes["Start"] = 1] = "Start";
        CommandBlockTypes[CommandBlockTypes["Move"] = 2] = "Move";
        CommandBlockTypes[CommandBlockTypes["Angle"] = 3] = "Angle";
        CommandBlockTypes[CommandBlockTypes["Scan"] = 4] = "Scan";
        CommandBlockTypes[CommandBlockTypes["Laser"] = 5] = "Laser";
        CommandBlockTypes[CommandBlockTypes["Grapple"] = 6] = "Grapple";
    })(CommandBlockTypes = exports.CommandBlockTypes || (exports.CommandBlockTypes = {}));
    var FlowBlockTypes;
    (function (FlowBlockTypes) {
        FlowBlockTypes[FlowBlockTypes["Empty"] = 0] = "Empty";
        FlowBlockTypes[FlowBlockTypes["Up"] = 1] = "Up";
        FlowBlockTypes[FlowBlockTypes["Down"] = 2] = "Down";
        FlowBlockTypes[FlowBlockTypes["Left"] = 3] = "Left";
        FlowBlockTypes[FlowBlockTypes["Right"] = 4] = "Right";
        FlowBlockTypes[FlowBlockTypes["ConditionalLeftRight"] = 5] = "ConditionalLeftRight";
        FlowBlockTypes[FlowBlockTypes["ConditionalLeftUp"] = 6] = "ConditionalLeftUp";
        FlowBlockTypes[FlowBlockTypes["ConditionalLeftDown"] = 7] = "ConditionalLeftDown";
        FlowBlockTypes[FlowBlockTypes["ConditionalUpRight"] = 8] = "ConditionalUpRight";
        FlowBlockTypes[FlowBlockTypes["ConditionalUpDown"] = 9] = "ConditionalUpDown";
        FlowBlockTypes[FlowBlockTypes["ConditionalDownRight"] = 10] = "ConditionalDownRight";
    })(FlowBlockTypes = exports.FlowBlockTypes || (exports.FlowBlockTypes = {}));
});
//# sourceMappingURL=Enums.js.map