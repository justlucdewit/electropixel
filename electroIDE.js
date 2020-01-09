//get elements
var canvas = document.getElementById("world");
canvas.width = window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var ctx = canvas.getContext("2d");
//nonconstants
var mouseDown = false;
var posX = 0;
var posY = 0;
//globalconstants
var TILESIZE = 30;
window.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.keyCode == 65) {
        posX += 5;
    }
    else if (e.keyCode == 68) {
        posX -= 5;
    }
    else if (e.keyCode == 87) {
        posY += 5;
    }
    else if (e.keyCode == 83) {
        posY -= 5;
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
    for (var x = posX; x < canvas.width + posX; x += TILESIZE) {
        line(x, 0, x, canvas.height);
    }
    for (var y = posY; y < canvas.height + posY; y += TILESIZE) {
        line(0, y, canvas.width, y);
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
