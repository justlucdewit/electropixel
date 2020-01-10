//get elements
const canvas = document.getElementById("world") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = 0.8*window.innerHeight;
const ctx = canvas.getContext("2d");

//nonconstants
let mouseDown = false
let posX = 0;
let posY = 0;
let keyState = {};

//globalconstants
const TILESIZE = 30;
 
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);

window.addEventListener("keydown", (e) => {
	if (e.keyCode == 65){
		posX+=5;
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
	
	//draw lines

	for (let x = 0; x < canvas.width; x += TILESIZE){
		line(x+(posX%TILESIZE), 0, x+(posX%TILESIZE), canvas.height);
	}
	
	for (let y = 0; y < canvas.height; y += TILESIZE){
		line(0, y+(posY%TILESIZE), canvas.width, y+(posY%TILESIZE));
	}
	
	//key input
	if (keyState[65]){
		posX+=5;
	}else if (keyState[68]){
		posX-=5;
	}
	
	if (keyState[87]){
		posY+=5;
	}else if (keyState[83]){
		posY-=5;
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