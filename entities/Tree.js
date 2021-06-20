class Tree extends Entity{

	constructor(opt={}){
		opt.color = '#8a360a';
		opt.size = 10;
		opt.speed = 0;
		super(opt);
		this.bag = Math.floor(random(1,5));
	}
	onInit(){
		
	}
	preUpdate(){}
	onCollision(entity){}
	onBoundary(side){}
}