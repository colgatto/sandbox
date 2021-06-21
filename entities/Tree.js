class Tree extends Entity{

	constructor(opt={}){
		opt.color = '#8a360a';
		super(opt);
		this.bag = Math.floor(random(1,5));
		this.size(8);
	}
	onInit(){
		
	}
	preUpdate(){}
	onCollision(entity){}
	onBoundary(side){}
}