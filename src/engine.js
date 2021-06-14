function setup() {
	createCanvas(W, H);
	frameRate(60);
	for (const army in armies) {
		armies[army].setup();
	}
}

function draw() {
	background(220);
	for (const army in armies) {
		armies[army].update();
		armies[army].draw();
	}
}
