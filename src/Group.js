class Group{

	constructor(opt){
		this.name = opt.name;

		this.r = (opt.size || 20) / 2;

		this.color = opt.color || 255;
		this.count = opt.count || 1;
		this.entityClass = opt.entityClass || null;
		
		this.speed = typeof opt.speed == 'undefined' ? sandboxConfig.defaultEntitySpeed : opt.speed;

		this.drawPathOn = opt.drawPath || false;
		this.defaultNearDist = opt.nearDist || 10;

		this.members = [];
	}
	
	nop(){}

	generateNewId(){
		let id = 'b' + Math.floor(random(0, 999999999));
		while (this.members.map( v => v.id ).includes(id)) id = 'b' + Math.floor(random(0, 999999999));
		return id;
	}

	addEntity(x=null,y=null){
		let isRandom = x===null || y===null;

		const newPos = isRandom ? createVector(random(this.r, sandbox.width - this.r),random(this.r, sandbox.height - this.r)) : createVector(x, y);

		if( newPos.x + this.r > sandbox.width || newPos.x - this.r < 0 ||
			newPos.y + this.r > sandbox.height || newPos.y - this.r < 0 )
			return isRandom ? this.addEntity() : false;

		for (let j = 0; j < sandbox.groupsL; j++) {
			let m = sandbox.groups[j].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( newPos.dist(b.pos) <= this.r + b.r ) return isRandom ? this.addEntity() : false;
			}
		}

		let id = this.generateNewId();
		let c = new this.entityClass({
			id: id,
			r: this.r,
			color: this.color,
			x: newPos.x,
			y: newPos.y,
			drawPath: this.drawPathOn,
			speed: this.speed,
			nearDist: this.defaultNearDist,
			group: this
		});

		this.members.push( c );
		return id;
	}

	setup(){
		this.members = [];
		for (let i = 0; i < this.count; i++) {
			this.addEntity();
		}
	}

	doForAll(method){
		for (let i = 0; i < this.members.length; i++) {
			this.members[i][method]();
		}
	}

	init(){
		this.doForAll('onInit');
	}

	draw(){
		this.doForAll('draw');
	}
	
	drawPath(){
		this.doForAll('drawPath');
	}
	
	update(){
		this.doForAll('update');
	}
	
	updatePosition(){
		this.doForAll('updatePosition');
	}


}