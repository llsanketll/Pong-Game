import { detectCollision } from './collision.js';
import audio from './audio.js';


export default class Brick {
    constructor(game, position) {
        this.game = game;

        this.position = position;

        this.width = 80;
        this.height = 24;

        this.markDelete = false;

    }

    draw(context) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = '#f2910a';
        context.fill();
        context.strokeStyle = 'whitesmoke';
        context.stroke();
        context.closePath();

    }

    update(deltaTime) {
        if (detectCollision(this.game.ball, this)) {
            audio.brick.play();
            this.game.ball.speed.y *= -1.001;
            this.game.ball.speed.x *= 1.01;
            this.game.bricks.forEach(brick => {
                brick.position.y += 5;
            })
            this.markDelete = true;
        }
    }
}