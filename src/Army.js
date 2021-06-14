class Army{

	constructor(opt){
		this.name = opt.name;
		this.size = opt.size || 20;
		this.color = opt.color || 255;
		this.count = opt.count || 1;
		
		this.botEvents = {
			onUpdate: opt.botEvents.onUpdate || this.nop,
			onCollision: opt.botEvents.onCollision || this.nop,
			onBoundary: opt.botEvents.onBoundary || this.nop
		}

		this.members = [];
	}
	
	nop(){}

	generateNewId(){
		let id = 'b' + random(0, 999999999);
		while (this.members.map( v => v.id ).includes(id)) id = 'b' + random(0, 999999999);
		return id;
	}

	addBot(){
		const data = { r: this.size / 2 };
		const newPos = createVector( random(data.r, W - data.r), random(data.r, H - data.r) );

		if( newPos.x + data.r > W || newPos.x - data.r < 0 ||
			newPos.y + data.r > H || newPos.y - data.r < 0 )
			return this.addBot();

		for (const army in armies) {
			let m = armies[army].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( newPos.dist(b.pos) <= data.r + b.r ) return this.addBot();
			}
		}

		let id = this.generateNewId();
		let c = new Bot({
			id: id,
			r: data.r,
			color: this.color,
			x: newPos.x,
			y: newPos.y
		});
		
		c.onCollision = this.botEvents.onCollision.bind(c);
		c.onBoundary = this.botEvents.onBoundary.bind(c);
		c.onUpdate = this.botEvents.onUpdate.bind(c);

		this.members.push( c );
		return id;
	}

	setup(){
		this.members = [];
		for (let i = 0; i < this.count; i++) {
			this.addBot();
		}
	}

	draw(){
		for (let i = 0; i < this.members.length; i++) {
			this.members[i].draw();
		}
	}

	update(){
		for (let i = 0; i < this.members.length; i++) {
			this.members[i].update();
		}
	}

}