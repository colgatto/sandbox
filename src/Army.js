class Army{

	constructor(opt){
		this.name = opt.name;

		this.r = (opt.size || 20) / 2;

		this.color = opt.color || 255;
		this.count = opt.count || 1;
		
		this.drawPathOn = opt.drawPath || false;
		this.defaultNearDist = opt.nearDist || 10;
		
		this.botEvents = {
			preUpdate: opt.botEvents.preUpdate || this.nop,
			onCollision: opt.botEvents.onCollision || this.nop,
			onBoundary: opt.botEvents.onBoundary || this.nop,
			onInit: opt.botEvents.onInit || this.nop,
		}

		this.members = [];
	}
	
	nop(){}

	generateNewId(){
		let id = 'b' + Math.floor(random(0, 999999999));
		while (this.members.map( v => v.id ).includes(id)) id = 'b' + Math.floor(random(0, 999999999));
		return id;
	}

	addBot(){
		
		const newPos = createVector( random(this.r, W - this.r), random(this.r, H - this.r) );

		if( newPos.x + this.r > W || newPos.x - this.r < 0 ||
			newPos.y + this.r > H || newPos.y - this.r < 0 )
			return this.addBot();

		for (const army in armies) {
			let m = armies[army].members;
			for (let i = 0; i < m.length; i++) {
				let b = m[i];
				if( newPos.dist(b.pos) <= this.r + b.r ) return this.addBot();
			}
		}

		let id = this.generateNewId();
		let c = new Bot({
			id: id,
			r: this.r,
			color: this.color,
			x: newPos.x,
			y: newPos.y,
			drawPath: this.drawPathOn,
			nearDist: this.defaultNearDist,
			army: this
		});
		
		c.onCollision = this.botEvents.onCollision.bind(c);
		c.onBoundary = this.botEvents.onBoundary.bind(c);
		c.preUpdate = this.botEvents.preUpdate.bind(c);
		c.onInit = this.botEvents.onInit.bind(c);

		this.members.push( c );
		return id;
	}

	setup(){
		this.members = [];
		for (let i = 0; i < this.count; i++) {
			this.addBot();
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


}