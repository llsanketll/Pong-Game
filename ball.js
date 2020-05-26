import { detectCollision } from './collision.js';
import audio from './audio.js';
export default class Ball {
    constructor(game) {
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;
        this.game = game;
        this.position = {
            x: 10,
            y: 400
        }
        this.speed = {
            x: 3,
            y: -2
        }
        this.size = 10;
    }

    reset() {
        this.position = {
            x: 10,
            y: 400
        }
        this.speed = {
            x: 3,
            y: -2
        }
    }


    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.size, 2 * Math.PI, false);
        context.fillStyle = '#e94822';
        context.fill();
    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Collision with wall
        if (this.position.x + this.size > this.gameWidth || this.position.x - this.size < 0) {
            audio.hit.play();
            this.speed.x *= -1;
        }
        if (this.position.y - this.size < 0) {
            audio.hit.play();
            this.speed.y *= -1;
        }

        //If the ball hits the bottom of the screen
        if (this.position.y + this.size > this.gameHeight) {
            audio.end.play();
            if (this.game.lives-- < 1)
                this.game.gameState = -1;
            this.reset();
        }

        // Collisoin with paddle
        if (detectCollision(this, this.game.paddle)) {
            audio.paddle.play();
            this.speed.y *= -1;
        }

    }
}