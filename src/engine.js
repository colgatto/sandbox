let loopCounter = 0;
let frameRatesList = [];
let currentFrameRate = 0;

function setup() {
	createCanvas(config.W, config.H);
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

	frameRatesList.push(Math.floor(frameRate()));
	if(loopCounter % 20 == 0){
		currentFrameRate = 0;
		for (let i = 0; i < frameRatesList.length; i++) {
			currentFrameRate += frameRatesList[i];
		}
		currentFrameRate = Math.floor(currentFrameRate/frameRatesList.length);
		frameRatesList = [];
	}
	fill(0);
	text('FPS: ' + currentFrameRate, 1, 1, 100, 50);

	loopCounter++;
}
