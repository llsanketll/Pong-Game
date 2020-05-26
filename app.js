import Game from './game.js';

let canvas, c, main, cHeight, cWidth;
canvas = document.querySelector('canvas');
main = document.querySelector('main');
cHeight = main.clientHeight;
cWidth = main.clientWidth;
canvas.width = cWidth;
canvas.height = cHeight;
c = canvas.getContext('2d');


let game = new Game(cWidth, cHeight);


function draw(){
    game.draw(c);

}

function update(dTime){
    game.update(dTime);
}


let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    c.clearRect(0,0, cWidth, cHeight);

    draw();
    update(deltaTime);

    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
