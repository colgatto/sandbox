class Wall extends Entity{

	constructor(opt={}){
		opt.color = '#494949';
		opt.size = 20;
		opt.speed = 0;
		super(opt);
	}
	onInit(){
		
	}
	preUpdate(){}
	onCollision(entity){}
	onBoundary(side){}

}