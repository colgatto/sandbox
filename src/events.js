function mouseClicked() {

}

let engine_state = true;

function keyPressed() {
	if (key === 'p') {
		engine_state = !engine_state;
		if (engine_state) {
			frameRate(0);
		} else {
			frameRate(60);
		}
	}
}