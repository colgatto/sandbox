
class Bot{

	boundary = { UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };

	constructor(opt = {}){

		this.id = opt.id || 'b' + random(0,999999999);

		this.pos = createVector(opt.x, opt.y);
		this.speed = opt.speed || 1;
		
		this.angle = opt.angle || random(365);

		this.color = opt.color || random(['yellow','purple','cyan','blue','green']);
		this.r = opt.r || 10;
		this.d = this.r * 2;

		this.velocity = p5.Vector.fromAngle(radians(this.angle));
		this.velocity.mult(this.speed);

	}

	nop(){}

	setVelocity(angle) {
		this.angle = angle;
		this.velocity.setHeading(radians(this.angle));
		this.velocity.mult(this.speed);
	}

	draw(){
		fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.d);
	}

	update(){
		let bc = this.checkBoundaryCollision();
		if(bc){
			this.onBoundary(bc);
		}
		
		let entity = this.checkCollision();
		if (entity) {
			this.onCollision(entity);
		}
		
		this.onUpdate();
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

}