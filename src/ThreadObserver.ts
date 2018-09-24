import { BaseUserInterface } from "./BaseUserInterface";
import { GameState } from "./GameState"
import { CommandBlock } from "./CommandBlock";
import { CommandTypes } from "./Enums";
import { GridBlock } from "./GridBlock";

export class ThreadObserver implements BaseUserInterface {
    public gameState: GameState;
    public x: number;
    public y: number;
    public h: number;
    public w: number;
    public maxUnits: number;
    public baseUnits: number;
    public mouseDown: boolean;
    public threads: number;
    updateDataCallBack: (totalThreads: number, baseUnits: number) => void;
    constructor(GameState: GameState, X: number, Y: number, H: number, W: number, MaxUnits: number, UpdateDataCallBack: (totalThreads: number, baseUnits: number) => void) {
        this.gameState = GameState;
        this.x = X;
        this.y = Y;
        this.h = H;
        this.w = W;
        this.maxUnits = MaxUnits;
        this.threads = 1;
        this.baseUnits = 1;
        this.updateDataCallBack = UpdateDataCallBack;
        this.mouseDown = false;

        this.gameState.userInterfaces.push(this);

        // initialize data
        this.updateDataCallBack(this.threads, this.baseUnits);
    }

    private recalculateExistingThreadCounts() : void {
        // for visuals
        let tempCommandThreadArray: CommandBlock[] = [];
        // for functionality
        let tempGridThreadArray: GridBlock[] = [];

        this.gameState.blocks.forEach(block => {
            if (block instanceof CommandBlock) {
                if (block.type === CommandTypes.Start) {
                    tempCommandThreadArray.push(block);
                }
            }
            else if (block instanceof GridBlock) {
                if (block.commandData.type === CommandTypes.Start) {
                    tempGridThreadArray.push(block);
                }
            }
        });

        // sort temp thread arrays, totalUnits is the thread count
        // CONSIDER: making another private function called like sortAndRecalculateThreadCounts
        tempCommandThreadArray.sort((a,b) => (a.totalUnits > b.totalUnits) ? 1 : ((b.totalUnits > a.totalUnits) ? -1 : 0));
        tempGridThreadArray.sort((a,b) => (a.commandData.totalUnits > b.commandData.totalUnits) ? 1 : ((b.commandData.totalUnits > a.commandData.totalUnits) ? -1 : 0));

        for (let i = 0; i < tempCommandThreadArray.length; i++) {
            if (i + 1 < tempCommandThreadArray[i].totalUnits) {
                // subtract thread count if not in order i.e. 1, 2, 4. -> 4 turns into 3
                tempCommandThreadArray[i].totalUnits--;
            }
        }

        for (let i = 0; i < tempGridThreadArray.length; i++) {
            if (i + 1 < tempGridThreadArray[i].commandData.totalUnits) {
                tempGridThreadArray[i].commandData.totalUnits--;
            }
        }
    }

    public mouseUp() : void { 
        let tempThreadCount = 1;

        this.gameState.blocks.forEach(block => {
            if (block instanceof CommandBlock) {
                if (block.type === CommandTypes.Start) {
                    tempThreadCount++;
                }
            }
        });

        this.threads = tempThreadCount;

        this.updateDataCallBack(this.threads, this.baseUnits);

        this.recalculateExistingThreadCounts();
    }

    update() : void {
        if (this.mouseDown) {
            this.mouseDown = false;
            let tempThreadCount = 1;
            this.gameState.blocks.forEach(block => {
                if (block instanceof CommandBlock) {
                    if (block.type === CommandTypes.Start) {
                        tempThreadCount++;
                    }
                }
            });

            this.threads = tempThreadCount;

            this.updateDataCallBack(this.threads, this.baseUnits);
        }

    }

    draw() : void {

    }
}