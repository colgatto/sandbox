const sandbox = new Sandbox(window.innerWidth, window.innerHeight );

/**/
sandbox.addGroup({
	name: 'tree',
	entityClass: Tree,
	count: 70
});
/**/
sandbox.addGroup({
	name: 'treecutter',
	entityClass: TreeCutter,
	count: 3
});
/**/
sandbox.addGroup({
	name: 'wall',
	entityClass: Wall,
	count: 20
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
	sandbox.addEntity('tree', mouseX, mouseY);
}

function keyPressed() {
	if (key === 'p') {
		sandbox.togglePause();
	}
}
