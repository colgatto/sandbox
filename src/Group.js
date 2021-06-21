class Group{

	constructor(opt){
		this.name = opt.name;

		this.count = opt.count || 1;
		this.entityClass = opt.entityClass || null;
	
		this.drawPathOn = opt.drawPath || false;
		this.defaultNearDist = opt.nearDist || 10;

		this.members = [];
	}
	
	nop(){}

	generateNewId(){
		let id = this.name + '_' + Math.floor(random(0, 999999999));
		while (this.members.map( v => v.id ).includes(id)) id = this.name + '_' + Math.floor(random(0, 999999999));
		return id;
	}

	addEntity(x=null,y=null){
		let isRandom = x===null || y===null;

		let id = this.generateNewId();
		let c = new this.entityClass({
			id: id,
			group: this
		});

		const newPos = isRandom ? createVector(random(c.r, sandbox.width - c.r),random(c.r, sandbox.height - c.r)) : createVector(x, y);

		if( newPos.x + c.r > sandbox.width || newPos.x - c.r < 0 ||
			newPos.y + c.r > sandbox.height || newPos.y - c.r < 0 )
			return isRandom ? this.addEntity() : false;

		for (let j = 0; j < sandbox.armiesL; j++) {
			let m = sandbox.armies[j].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( newPos.dist(b.pos) <= c.r + b.r ) return isRandom ? this.addEntity() : false;
			}
		}

		c.pos.x = newPos.x;
		c.pos.y = newPos.y;

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