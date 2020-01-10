//get elements
var canvas = document.getElementById("world");
canvas.width = window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var ctx = canvas.getContext("2d");
//nonconstants
var mouseDown = false;
var posX = 0;
var posY = 0;
var keyState = {};
//globalconstants
var TILESIZE = 30;
window.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
    keyState[e.keyCode || e.which] = false;
}, true);
window.addEventListener("keydown", function (e) {
    if (e.keyCode == 65) {
        posX += 5;
    }
});
canvas.addEventListener("mousemove", function (e) {
    if (mouseDown) {
        console.log(e.clientX);
    }
});
var loop = function () {
    //background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    //draw lines
    for (var x = 0; x < canvas.width; x += TILESIZE) {
        line(x + (posX % TILESIZE), 0, x + (posX % TILESIZE), canvas.height);
    }
    for (var y = 0; y < canvas.height; y += TILESIZE) {
        line(0, y + (posY % TILESIZE), canvas.width, y + (posY % TILESIZE));
    }
    //key input
    if (keyState[65]) {
        posX += 5;
    }
    else if (keyState[68]) {
        posX -= 5;
    }
    if (keyState[87]) {
        posY += 5;
    }
    else if (keyState[83]) {
        posY -= 5;
    }
    window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);
//helperfunctions
var line = function (x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};
document.body.onmousedown = function () {
    mouseDown = true;
};
document.body.onmouseup = function () {
    mouseDown = false;
};
