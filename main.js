const W = 900;
const H = 600;

let fullPath = [];

let botEvents = {
	preUpdate: function(inCollision){

		if(this.army.name == 'prede'){
			let n = this.getNearBot(25, 'cacciatori');
			if(n.length > 0){
				this.color = 'blue';
				let b = n[0].bot;
				let an = degrees( Math.atan2( ( b.pos.y - this.pos.y ) , ( b.pos.x - this.pos.x ) ) );
				this.setDirection( an - 180 );
				this.drawPath(true);
			}else{
				this.color = this.army.color;
				this.drawPath(false);
			}
		}

	},
	onCollision: function(entity){
		
		if(this.army.name == 'cacciatori' && entity.army.name == 'prede'){
			this.setR(this.r+2);
			this.setSpeed(this.speed+0.1);
			entity.destroy();
			return;
		}
		if(this.army.name == 'prede' && entity.army.name == 'cacciatori'){
			entity.setR(entity.r+2);
			entity.setSpeed(entity.speed+0.1);
			this.destroy();
			return;
		}
		this.setDirection( this.angle - 180 );
	},
	onBoundary: function(side){
		if( side == this.boundary.UP || side == this.boundary.DOWN ){
			this.setDirection( 360 - this.angle );
		}else if( side == this.boundary.LEFT || side == this.boundary.RIGHT ){
			this.setDirection( 180 - this.angle );
		}
	}
};

const armies = {
	c: new Army({
		name: 'cacciatori',
		color: 'red',
		size: 18,
		count: 20,
		botEvents: botEvents
	}),
	
	p: new Army({
		name: 'prede',
		color: 'green',
		size: 20,
		count: 100,
		botEvents: botEvents
	})
};
