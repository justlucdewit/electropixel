//get elements
const canvas = document.getElementById("world") as HTMLCanvasElement;
const statbar = document.getElementById("statusbar") as HTMLElement;

canvas.width = window.innerWidth;
canvas.height = 0.8*window.innerHeight;
const ctx = canvas.getContext("2d");



//globalconstants
const TILESIZE = 30;
const FASTMOVESPEED = 10;
const SLOWMOVESPEED = 5;
enum component{
	empty,
	wire,
	button,
	lamp
}

//nonconstants
let mouseDown = false
let posX = 0;
let posY = 0;
let tool = component.wire;
let keyState = {};
let lasttool = "";
 
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

const handledraw = (e) => {
	if (e.buttons !== 0 || keyState[70]){
		const x = ((e.clientX/TILESIZE)-posX/TILESIZE)|0;
		const y = ((e.clientY-canvas.getClientRects()[0].y)/TILESIZE)|0;
		
		lasttool = `drawn ${component[tool]} at ${x}, ${y}`
	}
}

canvas.addEventListener("mousemove", handledraw);

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
	let realmovespeed = FASTMOVESPEED
	if (keyState[16]){
		let realmovespeed = FASTMOVESPEED
	}
	if (keyState[65]){
		posX+=realmovespeed;
	}else if (keyState[68]){
		posX-=realmovespeed;
	}
	if (keyState[87]){
		posY+=realmovespeed;
	}else if (keyState[83]){
		posY-=realmovespeed;
		handledraw({buttons:1})
	}
	window.requestAnimationFrame(loop);
	
	//update status bar
	setStatus();
}

window.requestAnimationFrame(loop);

//helperfunctions
function setStatus(){
	statbar.innerText = `camera at x = ${(-posX/TILESIZE)|0}, y = ${(posY/TILESIZE)|0}\n${lasttool}`;
}

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