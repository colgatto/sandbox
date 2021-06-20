function mouseClicked() {
	sandbox.addEntity('cibo', mouseX, mouseY);
}

function keyPressed() {
	if (key === 'p') {
		sandbox.togglePause();
	}
}
