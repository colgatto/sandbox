
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
		
		this.angle = opt.angle || random(365);

		this.color = opt.color || random(['yellow','purple','cyan','blue','green']);
		this.r = opt.r || 10;
		this.d = this.r * 2;

		this.drawPathOn = opt.drawPath || false;

		this.velocity = p5.Vector.fromAngle(radians(this.angle));
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

	drawPath(on=true){
		this.drawPathOn = on;
	}

	setDirection(angle) {
		this.angle = angle;
		this.velocity.setHeading(radians(this.angle));
		//this.velocity.mult(this.speed);
	}

	draw(){
		fill(this.color);
		
		ellipse(this.pos.x, this.pos.y, this.d);
	}

	update(){
		
		this.preUpdate();

		let bc = this.checkBoundaryCollision();
		
		if(bc){
			this.onBoundary(bc);
		}
		
		let entity = this.checkCollision();
		if (entity) {
			this.onCollision(entity);
		}
		
		this.prevPos = this.pos.copy();
		this.pos.add(this.velocity);
		
		if(this.drawPathOn){
			//console.log(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
			fullPath.push({color: this.color, pos: [ this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y ] });
		}

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

	getNearBot(dist, armyFilter = false){
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

	getNearEntity

}