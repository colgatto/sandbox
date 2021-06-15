const W = Math.floor(window.innerWidth/1.7);
const H = Math.floor(window.innerHeight/1.7);

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
		this.pos.y = H - this.r - 1;
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
		this.pos.x = W - this.r - 1;
		this.addNewPath = true;
		return;
	}
}

const armies = {

	c: new Army({
		name: 'cacciatori',
		color: 'red',
		size: 18,
		count: 5,
		nearDist: 20,
		drawPath: true,
		botEvents: {
			
			onInit: function(){
				this.randCount = Math.floor(random(100));
			},

			preUpdate: function(){
				this.randCount++;
				let n = this.getNearBot('prede');
				if(n.length > 0){
					this.follow(n[0].bot);
					this.color = color(166, 16, 30);
				}else{
					this.color = this.army.color;
					if(this.randCount % 100 == 0) this.rotateDirection(random(-45, 45));
				}
			},

			onCollision: function(entity){
				if(entity.army.name == 'prede'){
					this.setR(this.r+2);
					this.setSpeed(this.speed+0.1);
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
	
	p: new Army({
		name: 'prede',
		color: 'green',
		size: 20,
		count: 60,
		nearDist: 25,
		drawPath: true,
		botEvents: {
			
			onInit: function(){
				this.randCount = Math.floor(random(100));
			},

			preUpdate: function(){
				this.randCount++;
				let n = this.getNearBot('cacciatori');
				if(n.length > 0){
					let b = n[0].bot;
					this.color = 'blue';
					let an = Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) );
					this.setDirection( an - Math.PI );
					this.setSpeed(1.01);
				}else{
					this.color = this.army.color;
					if(this.randCount % 100 == 0) this.rotateDirection(random(-45, 45));
					this.setSpeed(1);
				}
			},
			
			onCollision: function(entity){
				let an = Math.atan2( ( entity.pos.y - this.pos.y ) , ( entity.pos.x - this.pos.x ) );
				this.setDirection( an - Math.PI );
				entity.setDirection( an );
			},

			onBoundary: collideOnBound
		}
	})

};
