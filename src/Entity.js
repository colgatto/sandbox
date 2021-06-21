
const sortByDist = (a,b) => {
	if(a.dist > b.dist) return 1;
	if(a.dist < b.dist) return -1;
	return 0;
}

class Entity{

	boundary = { UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };
	
	constructor(opt = {}){

		this.id = opt.id || 'b' + random(0,999999999);
		this.group = opt.group || null;
		this.color = opt.color || 255;
		this.initialColor = this.color;

		this.pos = createVector(opt.x || width/2, opt.y || height/2);
		this.prevPos = this.pos.copy();

		this.drawPathOn = opt.drawPath || false;
		this.addNewPath = false;
		this.path = [ [ this.pos.x, this.pos.y ] ];

		this.stopped = false;
		/**
		 this.path = [{
			 color: this.color,
			 point: [ this.pos.x, this.pos.y ]
			}];
		/**/
		
		this.defaultNearDist = opt.nearDist || 20;
		
		this.velocity = p5.Vector.random2D();
		this.speed(0);
		this.size(10);
	}

	size(size){
		if(typeof size == 'undefined')
			return this.d;
		this.d = size;
		this.r = size/2;
	}

	speed(speed){
		if(typeof speed == 'undefined'){
			return this.velocity.mag();
		}
		if(speed == 0){
			this.stop();
		}else{
			this.stop(false);
			this.velocity.setMag(speed);
		}
	}

	stop(stopped = true){
		this.stopped = stopped;
	}

	setColor(c){
		if(this.color != c){
			this.color = c;
			this.addNewPath = true;
		}
	}

	nop(){}

	setDirection(radians) {
		this.velocity.setHeading(radians);
		this.addNewPath = true;
	}

	getDirection() {
		return this.velocity.heading();
	}
	
	rotateDirection(radiant) {
		this.velocity.rotate(radiant);
		this.addNewPath = true;
	}

	draw(){
		fill(this.color);	
		ellipse(this.pos.x, this.pos.y, this.d);
	}	

	drawPath(){
		if(this.drawPathOn){
			/**/
			push();
			noFill();
			stroke(this.color);
			beginShape();
			for (let i = 0; i < this.path.length; i++) {
				vertex(...this.path[i]);
			}
			vertex(this.pos.x, this.pos.y);
			endShape();			
			pop();
			/**
			let lastColor = this.color;
			push();
			noFill();
			stroke(lastColor);
			beginShape();
			for (let i = 0; i < this.path.length; i++) {
				let p = this.path[i];
				vertex(...p.point);
				if(p.color != lastColor){
					vertex(...p.point);
					endShape();
					stroke(p.color);
					beginShape();
					vertex(...p.point);
					lastColor = p.color;
				}	
			}
			stroke(lastColor);
			vertex(this.pos.x, this.pos.y);
			endShape();			
			pop();
			/**/
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
		
		if(this.stopped) return;

		let newPos = p5.Vector.add(this.pos, this.velocity);

		if(this.drawPathOn && this.addNewPath){
			this.addNewPath = false;
			if(newPos.dist(this.prevPos) > sandboxConfig.minDistNewPath ){
				//this.path.push( { color: this.color, point: [ newPos.x, newPos.y ] } );
				this.path.push( [ newPos.x, newPos.y ] );
				this.prevPos = newPos.copy();
				if(this.path.length > sandboxConfig.maxPathLength) this.path.shift();
			}
		}

		this.pos = newPos;
	}

	checkBoundaryCollision(){
		var newPos = p5.Vector.add(this.pos, this.velocity);
		if (newPos.x + this.r > sandbox.width) return this.boundary.RIGHT;
		if (newPos.x - this.r < 0 ) return this.boundary.LEFT;
		if (newPos.y + this.r > sandbox.height) return this.boundary.DOWN;
		if (newPos.y - this.r < 0) return this.boundary.UP;
		return false;
	}

	checkCollision(){
		for (let j = 0; j < sandbox.groupsL; j++) {
			let m = sandbox.groups[j].members;
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

	getNearEntity(groupFilter = false, dist = false){
		if(!dist) dist = this.defaultNearDist;
		let near = [];
		for (let j = 0; j < sandbox.groupsL; j++) {
			let m = sandbox.groups[j].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( b.id == this.id ) continue;
				if(groupFilter && groupFilter != b.group.name) continue;
				let d = this.pos.dist(b.pos) - this.r - b.r;
				if( d <= dist ){
					near.push({dist: d, entity: b });
				}
			}
		}
		near.sort(sortByDist);
		return near;
	}

	destroy(){
		//this.color = 255;
		for (let i = 0, l = this.group.members.length; i < l; i++) {
			if(this.group.members[i].id == this.id){
				this.group.members.splice(i, 1);
				this.group.count--;
				return;
			}
		}
	}

	follow(b, unfollow = false){
		let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
		this.setDirection( unfollow ? an - Math.PI : an );
	}

	moveToNearFree(){
		var dir = this.getDirection();
		var newDir = 0;
		let found = false;
		while(newDir < Math.PI*2){
			newDir += 0.1;
			this.setDirection(newDir);
			if(this.checkCollision()){
				continue;
			}
			found = true;
			break;
		}
		if(!found) this.setDirection(dir);
		return false;
	}

}