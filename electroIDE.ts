//get elements
const canvas = document.getElementById("world") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = 0.8*window.innerHeight;
const ctx = canvas.getContext("2d");

//nonconstants
let mouseDown = false
let posX = 0;
let posY = 0;

//globalconstants
const TILESIZE = 30;

canvas.addEventListener("mousemove", (e) => {
	if (mouseDown){
		console.log(e.clientX);
	}
});

function loop(){
	//background
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "black";
	
	for (let x = 0; x < canvas.width; x += TILESIZE){
		line(x, 0, x, canvas.height);
	}
	
	for (let y = 0; y < canvas.height; y += TILESIZE){
		line(0, y, canvas.width, y);
	}
	
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

//helperfunctions
function line(x1, y1, x2, y2){
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}