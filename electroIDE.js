//get elements
var canvas = document.getElementById("world");
canvas.width = window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var ctx = canvas.getContext("2d");
//nonconstants
var mouseDown = false;
//globalconstants
var TILESIZE = 30;
canvas.addEventListener("mousemove", function (e) {
    if (mouseDown) {
        console.log(e.clientX);
    }
});
function loop() {
    //background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    for (var x = 0; x < canvas.width; x += TILESIZE) {
        line(x, 0, x, canvas.height);
    }
    for (var y = 0; y < canvas.height; y += TILESIZE) {
        line(0, y, canvas.width, y);
    }
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
//helperfunctions
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
document.body.onmousedown = function () {
    mouseDown = true;
};
document.body.onmouseup = function () {
    mouseDown = false;
};
