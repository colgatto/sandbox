const sandbox = new Sandbox(window.innerWidth, window.innerHeight );

sandbox.addArmy({
	name: 'cacciatori',
	botClass: Cacciatore,
	color: '#ff0000',
	size: 18,
	count: 20,
	nearDist: 22,
	drawPath: true,
});

sandbox.addArmy({
	name: 'prede',
	botClass: Preda,
	color: '#00df00',
	size: 20,
	count: 100,
	nearDist: 25,
	drawPath: true
});

sandbox.addArmy({
	name: 'cibo',
	botClass: Cibo,
	color: '#0000df',
	size: 5,
	count: 20,
	speed: 0
});

sandbox.addArmy({
	name: 'wall',
	botClass: Wall,
	color: '#8f8f8f',
	size: 5,
	count: 200,
	speed: 0
});

////////////////

function setup() {
	sandbox.setup();
}

function draw() {
	sandbox.draw();
}

//////////////////

function mouseClicked() {
	sandbox.addBot('cibo', mouseX, mouseY);
}

function keyPressed() {
	if (key === 'p') {
		sandbox.togglePause();
	}
}
