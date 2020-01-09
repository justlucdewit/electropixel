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

window.addEventListener("keydown", (e) => {
	console.log(e)
	if (e.keyCode == 65){
		posX+=5;
	}else if (e.keyCode == 68){
		posX-=5;
	}else if (e.keyCode == 87){
		posY+=5;
	}else if (e.keyCode == 83){
		posY-=5;
	}
});

canvas.addEventListener("mousemove", (e) => {
	if (mouseDown){
		console.log(e.clientX);
	}
});

const loop = () =>{
	//background
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "black";
	
	for (let x = posX; x < canvas.width+posX; x += TILESIZE){
		line(x, 0, x, canvas.height);
	}
	
	for (let y = posY; y < canvas.height+posY; y += TILESIZE){
		line(0, y, canvas.width, y);
	}
	
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

//helperfunctions
const line = (x1:number, y1:number, x2:number, y2:number) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

document.body.onmousedown = () => { 
  mouseDown = true;
}
document.body.onmouseup = () => {
  mouseDown = false;
}