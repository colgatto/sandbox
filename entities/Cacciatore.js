class Cacciatore extends Entity{
	
	constructor(opt={}){
		super(opt);
		this.randCount = Math.floor(random(100));
	}

	onInit(){
		
	}
	preUpdate(){
		this.randCount++;
		let n = this.getNearEntity('prede');
		if(n.length > 0){
			this.follow(n[0].entity);
			this.setColor('#96101e');
		}else{
			this.setColor(this.group.color);
			if(this.randCount % 100 == 0) this.rotateDirection(random(-45, 45));
		}
	}

	onCollision(entity){
		if(entity.group.name == 'prede'){
			this.setR(this.r+2);
			this.setSpeed(this.speed+0.03);
			entity.destroy();
			return;
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