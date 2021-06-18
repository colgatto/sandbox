function mouseClicked() {
	sandbox.addBot('cibo', mouseX, mouseY);
}

function keyPressed() {
	if (key === 'p') {
		sandbox.togglePause();
	}
}
