const UI = new Ui(1,1,100,20);

function setup() {
	createCanvas(config.W, config.H);
	frameRate(60);
	for (const army in armies) {
		armies[army].setup();
	}
	
	for (const army in armies) {
		armies[army].init();
	}

	
	setInterval(()=>{
		armies.cibo.addBot();
	}, 200);

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

	UI.update();
	UI.draw();

}
