import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import { buildLevel, level1 } from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    GAMEOVER: -1,
    MENU: 2
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAMESTATE.MENU;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        new InputHandler(this, this.paddle);

        this.lives = 3;
        this.gameObjects = [];
        this.bricks = [];
    }
 
    start() {

        this.bricks = buildLevel(this, level1);
        
        // Array of Game Objects
        this.gameObjects = [this.ball, this.paddle, ...this.bricks]
        this.lives = 3;
        this.gameState = GAMESTATE.RUNNING;
    }

    togglePause() {
        if (this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }

    }

    draw(ctx) {
        this.gameObjects.forEach(e => e.draw(ctx));

        let write = (text, opacity) => { 
            ctx.fillStyle = `rgba(246, 246, 246,${opacity})`;
            ctx.fillRect(0, 0, innerWidth, innerHeight);
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "#fc8a15";
            ctx.textAlign = 'center';
            ctx.fillText(text, this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState == GAMESTATE.PAUSED) {  
            write('Paused', 0.5);
        }
        if (this.gameState == GAMESTATE.MENU) {
            write('Press Space Bar to Start the game', 1);
        }
        if(this.gameState == GAMESTATE.GAMEOVER){
            write('Game Over', 1);
        }
    }

    update(dTime) {
        if (this.gameState === GAMESTATE.RUNNING) {
            this.gameObjects.forEach(e => e.update(dTime));

            this.gameObjects = this.gameObjects.filter(object => !object.markDelete);
        }
    }
}