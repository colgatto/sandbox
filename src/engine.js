function setup() {
	createCanvas(W, H);
	frameRate(60);
	for (const army in armies) {
		armies[army].setup();
	}
	
	for (const army in armies) {
		armies[army].init();
	}
}

function draw() {
	background(220);
	
	for (const army in armies) {
		armies[army].update();
	}
	for (const army in armies) {
		armies[army].updatePosition();
	}
	for (const army in armies) {
		armies[army].drawPath();
	}
	for (const army in armies) {
		armies[army].draw();
	}

}
