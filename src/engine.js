function setup() {
	createCanvas(W, H);
	frameRate(60);
	for (const army in armies) {
		armies[army].setup();
	}
}

function draw() {
	background(220);
	
	for (let i = 0; i < fullPath.length; i++) {
		const pData = fullPath[i];
		fill(pData.color);
		line(...pData.pos);
	}
	
	for (const army in armies) {
		armies[army].update();
		armies[army].draw();
	}

}
