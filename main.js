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
		this.setDirection( 360 - this.angle );
		this.pos.y = this.r + 1;
		return;
	}
	if( side == this.boundary.DOWN ){
		this.setDirection( 360 - this.angle );
		this.pos.y = H - this.r - 1;
		return;
	}
	if( side == this.boundary.LEFT ){
		this.setDirection( 180 - this.angle );
		this.pos.x = this.r + 1;
		return;
	}
	if( side == this.boundary.RIGHT ){
		this.setDirection( 180 - this.angle );
		this.pos.x = W - this.r - 1;
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
					//if(this.randCount % 100 == 0) this.velocity.rotate(random(-45, 45));//this.setDirection( this.angle + random(-30, 30) );
				}
			},

			onCollision: function(entity){
				if(entity.army.name == 'prede'){
					this.setR(this.r+2);
					this.setSpeed(this.speed+0.1);
					entity.destroy();
					return;
				}
				let an = degrees( Math.atan2( ( entity.pos.y - this.pos.y ) , ( entity.pos.x - this.pos.x ) ) );
				this.setDirection( an - 180 );
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
					let an = degrees( Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) ) );
					this.setDirection( an - 180 );
					this.setSpeed(1.1);
				}else{
					this.color = this.army.color;
					//if(this.randCount % 100 == 0) this.velocity.rotate(random(-45, 45));//this.setDirection( this.angle + random(-30, 30) );
					//this.setSpeed(1);
				}
			},
			
			onCollision: function(entity){
				if(entity.army.name == 'cacciatori'){
					entity.setR(entity.r+2);
					entity.setSpeed(entity.speed+0.01);
					this.destroy();
					return;
				}
				let an = degrees( Math.atan2( ( entity.pos.y - this.pos.y ) , ( entity.pos.x - this.pos.x ) ) );
				this.setDirection( an - 180 );
				entity.setDirection( an );		
			},

			onBoundary: collideOnBound
		}
	})

};
