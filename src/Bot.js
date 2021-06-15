
const sortByDist = (a,b) => {
	if(a.dist > b.dist) return 1;
	if(a.dist < b.dist) return -1;
	return 0;
}

class Bot{

	boundary = { UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };

	constructor(opt = {}){

		this.id = opt.id || 'b' + random(0,999999999);
		this.army = opt.army || null;

		this.pos = createVector(opt.x || W/2, opt.y || H/2);
		this.prevPos = this.pos.copy();
		
		this.speed = opt.speed || 1;
		
		this.color = opt.color || random(['yellow','purple','cyan','blue','green']);
		this.r = opt.r || 10;
		this.d = this.r * 2;

		this.drawPathOn = opt.drawPath || false;
		this.path = [{
			color: this.color,
			point: [ this.pos.x, this.pos.y ]
		}];
		this.addNewPath = false;
		
		this.defaultNearDist = opt.nearDist || 10;

		this.velocity = p5.Vector.random2D();
		this.velocity.mult(this.speed);

	}

	setR(r){
		this.r = r;
		this.d = r*2;
	}

	setSpeed(speed){
		this.speed = speed;
		this.velocity.setMag(this.speed);
	}

	nop(){}

	/*drawPath(on=true){
		this.drawPathOn = on;
	}*/

	setDirection(radians) {
		this.velocity.setHeading(radians);
		this.addNewPath = true;
	}
	
	rotateDirection(angle) {
		this.velocity.rotate(angle);
		this.addNewPath = true;
	}

	draw(){
		fill(this.color);	
		ellipse(this.pos.x, this.pos.y, this.d);
	}	

	drawPath(){
		if(this.drawPathOn){
			push();

			/**/
			
			noFill();
			beginShape();
			stroke(this.color);
			for (let i = 0; i < this.path.length; i++) {
				vertex(...this.path[i].point);
			}
			vertex(this.pos.x, this.pos.y);
			endShape();
			
			/**
			
			for (let i = 0; i < this.path.length; i++) {
				stroke(this.path[i].color);
				point(...this.path[i].point);
			}
			
			/**/

			pop();
		}
	}

	update(){
		
		this.preUpdate();

		let entity = this.checkCollision();
		if (entity) {
			this.onCollision(entity);
		}

		let bc = this.checkBoundaryCollision();
		
		if(bc){
			this.onBoundary(bc);
		}

	}

	updatePosition(){
		let newPos = p5.Vector.add(this.pos, this.velocity);

		if(this.drawPathOn && this.addNewPath){
			this.addNewPath = false;
			if(newPos.dist(this.prevPos) > 10 ){
				this.path.push( { color: this.color, point: [ newPos.x, newPos.y ] } );
				this.prevPos = newPos.copy();
				if(this.path.length > 35) this.path.shift();
			}
		}

		this.pos = newPos;
	}

	checkBoundaryCollision(){
		var newPos = p5.Vector.add(this.pos, this.velocity);
		if (newPos.x + this.r > W) return this.boundary.RIGHT;
		if (newPos.x - this.r < 0 ) return this.boundary.LEFT;
		if (newPos.y + this.r > H) return this.boundary.DOWN;
		if (newPos.y - this.r < 0) return this.boundary.UP;
		return false;
	}

	checkCollision(){
		for (const army in armies) {
			let m = armies[army].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( b.id == this.id ) continue;
				if( this.pos.dist(b.pos) <= this.r + b.r ){
					return b;
				}
			}
		}
		return false;
	}

	getNearBot(armyFilter = false, dist = false){
		if(!dist) dist = this.defaultNearDist;
		let near = [];
		for (const army in armies) {
			let m = armies[army].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( b.id == this.id ) continue;
				if(armyFilter && armyFilter != b.army.name) continue;
				let d = this.pos.dist(b.pos) - this.r - b.r;
				if( d <= dist ){
					near.push({dist: d, bot: b });
				}
			}
		}
		near.sort(sortByDist);
		return near;
	}

	destroy(){
		//this.color = 255;
		for (let i = 0, l = this.army.members.length; i < l; i++) {
			if(this.army.members[i].id == this.id){
				this.army.members.splice(i, 1);
				this.army.count--;
				return;
			}
		}
	}

	follow(b){
		let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
		this.setDirection( an );
	}

}