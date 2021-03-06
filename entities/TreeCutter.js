class TreeCutter extends Entity{
	
	constructor(opt={}){
		opt.color = '#20bf80';
		super(opt);
		
		this.randCount = Math.floor(random(100));
		this.speed(1);
		this.size(20);
		this.bag = 0;
		
		this.cutTime = 0;

		this.state = 'search';

	}
	
	onInit(){
		
	}

	preUpdate(){
		this.randCount++;
		switch (this.state) {
				
			case 'search':
				let nearTree = this.getNearEntity('tree', 30);
				if(nearTree.length){
					this.setColor('#ace32b');
					this.follow(nearTree[0].entity);
				}else{
					this.setColor(this.initialColor);
					if(this.randCount % 50 == 0) this.rotateDirection(random(-0.7, 0.7));
				}
				break;

			case 'cutting':
				this.cutTree(this.cuttingTree);
				break;
				
			default:
				break;
		}
	}

	onCollision(entity){
		switch (entity.group.name) {
			case 'tree':
				this.cuttingTree = entity;
				this.speed(0);
				this.state = 'cutting';
				return;
			case 'wall':
				this.follow(entity, true);
				return;
		}
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

	cutTree(entity){
		this.cutTime++;
		if(this.cutTime % 100 == 0){
			this.cutTime = 0;
			this.bag++;
			entity.bag--;
			if(entity.bag == 0){
				entity.destroy();
				console.log(this.id + ' cut down ' + entity.id);
				this.speed(1);
				this.state = 'search';
			}else{
				console.log(this.id + ' get 1 wood');
			}
		}
	}

}