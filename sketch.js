const sandbox = new Sandbox(window.innerWidth, window.innerHeight );

/**/
sandbox.addGroup({
	name: 'cacciatori',
	entityClass: Cacciatore,
	color: '#ff0000',
	size: 18,
	count: 6,
	nearDist: 50,
	drawPath: true,
});
/**/

sandbox.addGroup({
	name: 'prede',
	entityClass: Preda,
	color: '#00df00',
	size: 20,
	count: 70,
	nearDist: 25,
	drawPath: true,
	speed: 1.2
});

sandbox.addGroup({
	name: 'cibo',
	entityClass: Cibo,
	color: '#0000df',
	size: 5,
	count: 200,
	speed: 0
});


sandbox.addGroup({
	name: 'wall',
	entityClass: Wall,
	color: '#8f8f8f',
	size: 5,
	count: 5,
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
	sandbox.addEntity('cibo', mouseX, mouseY);
}

function keyPressed() {
	if (key === 'p') {
		sandbox.togglePause();
	}
}
