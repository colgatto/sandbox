const W = 600;
const H = 400;

let botEvents = {
	onUpdate: function(){
		this.pos.add(this.velocity);
	},
	onCollision: function(entity){
		/*let tmc = this.color;
		this.color = entity.color;
		entity.color = tmc;*/
		this.setVelocity(this.angle - 180);
	},
	onBoundary: function(side){
		if( side == this.boundary.UP || side == this.boundary.DOWN ){
			this.setVelocity( 360 - this.angle );
		}else if( side == this.boundary.LEFT || side == this.boundary.RIGHT ){
			this.setVelocity( 180 - this.angle );
		}
	}
};

const armies = {
	c: new Army({
		name: 'cacciatori',
		color: 'red',
		size: 20,
		count: 20,
		botEvents: botEvents
	}),

	p: new Army({
		name: 'prede',
		color: 'green',
		size: 25,
		count: 30,
		botEvents: botEvents
	})
};
