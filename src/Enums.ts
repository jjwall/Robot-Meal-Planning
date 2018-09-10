export enum CommandBlockTypes {
    Empty,
    Start,
    Move,
    Angle,
    Scan,
    Laser,
    Grapple
}

export enum FlowBlockTypes {
    Empty,
    Up,
    Down,
    Left,
    Right,
    ConditionalLeftRight,
    ConditionalLeftUp,
    ConditionalLeftDown,
    ConditionalUpRight,
    ConditionalUpDown,
    ConditionalDownRight
}