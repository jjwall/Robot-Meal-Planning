import { GameState } from "./main";
import { CommandBlock, CommandBlockButton } from "./CommandBlock";
import { GridBlock } from "./GridBlock";

export function SetUpEventListeners(gameState: GameState) {
    gameState.canvas.addEventListener('mousedown', function() : void {
        // Collision detection between clicked offset and block.
        gameState.blocks.forEach(function(block) : void {
            if (gameState.mouseY > block.y && gameState.mouseY < block.y + block.h
                && gameState.mouseX > block.x && gameState.mouseX < block.x + block.w) {
                if (block instanceof CommandBlock || block instanceof CommandBlockButton) {
                    block.mouseDown = true;
                }
                else if (block instanceof GridBlock) {
                    block.empty = true;
                }
            }
        })
    }, false);

    gameState.canvas.addEventListener('mouseup', function() : void {
        gameState.blocks.forEach(function(block) {
            if (block instanceof CommandBlock) {
                if (block.mouseDown) {
                    block.mouseDown = false;
                }
            }
        })
    }, false);

    gameState.canvas.addEventListener('mousemove', function(evt: MouseEvent) : void {
        gameState.mouseX = (evt.clientX - gameState.rect.left) / (gameState.rect.right - gameState.rect.left) * gameState.canvas.width;
        gameState.mouseY = (evt.clientY - gameState.rect.top) / (gameState.rect.bottom - gameState.rect.top) * gameState.canvas.height;
    }, false);
}