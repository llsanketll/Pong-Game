export function detectCollision(ball, gameObject) {
    //Collision wiht paddle
    let ballBottom = ball.position.y + ball.size;
    let ballTop = ball.position.y - ball.size;

    let gameObjectLeft = gameObject.position.x;
    let gameObjectTop = gameObject.position.y;
    let gameObjectRight = gameObject.position.x + gameObject.width;
    let gameObjectBottom = gameObject.position.y + gameObject.height;

    if (ballBottom >= gameObjectTop &&
        ballTop <= gameObjectBottom &&
        ball.position.x >= gameObjectLeft &&
        ball.position.x + ball.size <= gameObjectRight
    ) {
        return true;
    } else {
        return false;
    }

}