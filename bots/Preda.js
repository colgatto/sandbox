class Preda extends Bot{
	
	constructor(opt={}){
		super(opt);
		this.randCount = Math.floor(random(100));
		this.bag = 0;
	}
	
	onInit(){
		
	}

	preUpdate(){
		this.randCount++;
		let n = this.getNearBot('cacciatori');
		let n2 = this.getNearBot('cibo', 20);
		if(n.length){
			let b = n[0].bot;
			this.setColor('#d0df00');
			let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
			this.setDirection( an - Math.PI );
			//this.setSpeed(1.1);
		}else if(n2.length){
			let b = n2[0].bot;
			this.setColor('#20bf80');
			let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
			this.setDirection( an );
			//this.setSpeed(1.1);
		}else{
			this.setColor(this.army.color);
			if(this.randCount % 50 == 0) this.rotateDirection(random(-0.7, 0.7));
			//this.setSpeed(1);
		}
	}

	onCollision(entity){
		switch (entity.army.name) {
			case 'cibo':
				this.bag++;
				this.setR(this.r+1);
				entity.destroy();
				return;
			case 'wall':
				//let newDir = this.moveToNearFree();
				//console.log(newDir);
				//if(newDir !== false) this.setDirection( newDir );
				//return;
		}
		let an = Math.atan2( ( entity.pos.y - this.pos.y ) , ( entity.pos.x - this.pos.x ) );
		this.setDirection( an - Math.PI );
	}

	onBoundary(side){
		if( side == this.boundary.UP ){
			this.velocity.y = -this.velocity.y;
			this.pos.y = this.r + 1;
			this.addNewPath = true;
			return;
		}
		if( side == this.boundary.DOWN ){
			this.velocity.y = -this.velocity.y;
			this.pos.y = sandbox.height - this.r - 1;
			this.addNewPath = true;
			return;
		}
		if( side == this.boundary.LEFT ){
			this.velocity.x = -this.velocity.x;
			this.pos.x = this.r + 1;
			this.addNewPath = true;
			return;
		}
		if( side == this.boundary.RIGHT ){
			this.velocity.x = -this.velocity.x;
			this.pos.x = sandbox.width - this.r - 1;
			this.addNewPath = true;
			return;
		}
	}
}