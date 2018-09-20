export enum CommandTypes {
    Empty,
    Start,
    Move,
    Angle,
    Thread,
    Scan,
    Laser,
    Grapple
}

export enum FlowTypes {
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