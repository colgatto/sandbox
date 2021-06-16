
const getFirst = (list, army) => {
	for (let i = 0; i < list.length; i++) {
		if(list[i].bot.army.name == army) return list[i];
	}
	return false;
};

function collideOnBound(side){
	if( side == this.boundary.UP ){
		this.velocity.y = -this.velocity.y;
		this.pos.y = this.r + 1;
		this.addNewPath = true;
		return;
	}
	if( side == this.boundary.DOWN ){
		this.velocity.y = -this.velocity.y;
		this.pos.y = config.H - this.r - 1;
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
		this.pos.x = config.W - this.r - 1;
		this.addNewPath = true;
		return;
	}
}

const armies = {

	c: new Army({
		name: config.cacciatori.name,
		color: config.cacciatori.color,
		size: config.cacciatori.size,
		count: config.cacciatori.count,
		nearDist: config.cacciatori.nearDist,
		drawPath: config.cacciatori.drawPath,
		botEvents: {
			
			onInit: function(){
				this.randCount = Math.floor(random(100));
			},

			preUpdate: function(){
				this.randCount++;
				let n = this.getNearBot(config.prede.name);
				if(n.length > 0){
					this.follow(n[0].bot);
					this.setColor(config.cacciatori.alertColor);
				}else{
					this.setColor(this.army.color);
					if(this.randCount % 100 == 0) this.rotateDirection(random(-45, 45));
				}
			},

			onCollision: function(entity){
				if(entity.army.name == config.prede.name){
					this.setR(this.r+2);
					this.setSpeed(this.speed+0.03);
					entity.destroy();
					return;
				}
				let an = Math.atan2( ( entity.pos.y - this.pos.y ) , ( entity.pos.x - this.pos.x ) );
				this.setDirection( an - Math.PI );
				//entity.setDirection( an );
			},

			onBoundary: collideOnBound

		}
	}),
	
	p: new Army({
		name: config.prede.name,
		color: config.prede.color,
		size: config.prede.size,
		count: config.prede.count,
		nearDist: config.prede.nearDist,
		drawPath: config.prede.drawPath,
		botEvents: {
			
			onInit: function(){
				this.bag = 0;
				this.randCount = Math.floor(random(100));
			},

			preUpdate: function(){
				this.randCount++;
				let n = this.getNearBot('cacciatori');
				let n2 = this.getNearBot('cibo', 50);
				if(n.length){
					let b = n[0].bot;
					this.setColor(config.prede.alertColor);
					let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
					this.setDirection( an - Math.PI );
					this.setSpeed(1.1);
				}else if(n2.length){
					let b = n2[0].bot;
					this.setColor(config.prede.eatColor);
					let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
					this.setDirection( an );
					this.setSpeed(1.1);
				}else{
					this.setColor(this.army.color);
					if(this.randCount % 100 == 0) this.rotateDirection(random(-45, 45));
					this.setSpeed(1);
				}

			},
			
			onCollision: function(entity){
				if(entity.army.name == config.cibo.name){
					this.bag++;
					this.setR(this.r+1);
					entity.destroy();
					return;
				}
				let an = Math.atan2( ( entity.pos.y - this.pos.y ) , ( entity.pos.x - this.pos.x ) );
				this.setDirection( an - Math.PI );
				entity.setDirection( an );
			},

			onBoundary: collideOnBound
		}
	}),

	cibo: new Army({
		name: config.cibo.name,
		color: config.cibo.color,
		size: config.cibo.size,
		count: config.cibo.count,
		speed: config.cibo.speed,
		botEvents: {
		}
	})

};
