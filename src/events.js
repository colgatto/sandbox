function mouseClicked() {
	armies.cibo.addBot(mouseX, mouseY);
}

let engine_state = true;

function keyPressed() {
	if (key === 'p') {
		engine_state = !engine_state;
		if (engine_state) {
			loop();
			frameRate(60);
		} else {
			noLoop();
			frameRate(0);
		}
	}
}
