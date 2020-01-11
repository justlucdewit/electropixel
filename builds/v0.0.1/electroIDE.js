//get elements
var canvas = document.getElementById("world");
var statbar = document.getElementById("statusbar");
canvas.width = window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var ctx = canvas.getContext("2d");
//globalconstants
var TILESIZE = 30;
var FASTMOVESPEED = 10;
var SLOWMOVESPEED = 5;
var component;
(function (component) {
    component[component["empty"] = 0] = "empty";
    component[component["wire"] = 1] = "wire";
    component[component["button"] = 2] = "button";
    component[component["lamp"] = 3] = "lamp";
})(component || (component = {}));
//nonconstants
var mouseDown = false;
var posX = 0;
var posY = 0;
var tool = component.wire;
var keyState = {};
var lasttool = "";
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
var handledraw = function (e) {
    if (e.buttons !== 0 || keyState[70]) {
        var x = ((e.clientX / TILESIZE) - posX / TILESIZE) | 0;
        var y = ((e.clientY - canvas.getClientRects()[0].y) / TILESIZE) | 0;
        lasttool = "drawn " + component[tool] + " at " + x + ", " + y;
    }
};
canvas.addEventListener("mousemove", handledraw);
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
    var realmovespeed = FASTMOVESPEED;
    if (keyState[16]) {
        var realmovespeed_1 = FASTMOVESPEED;
    }
    if (keyState[65]) {
        posX += realmovespeed;
    }
    else if (keyState[68]) {
        posX -= realmovespeed;
    }
    if (keyState[87]) {
        posY += realmovespeed;
    }
    else if (keyState[83]) {
        posY -= realmovespeed;
        handledraw({ buttons: 1 });
    }
    window.requestAnimationFrame(loop);
    //update status bar
    setStatus();
};
window.requestAnimationFrame(loop);
//helperfunctions
function setStatus() {
    statbar.innerText = "camera at x = " + ((-posX / TILESIZE) | 0) + ", y = " + ((posY / TILESIZE) | 0) + "\n" + lasttool;
}
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
