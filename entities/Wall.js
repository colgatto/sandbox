class Wall extends Entity{

	constructor(opt={}){
		opt.color = '#494949';
		super(opt);
		this.speed(0);
		this.size(20);
	}
	onInit(){
		
	}
	preUpdate(){}
	onCollision(entity){}
	onBoundary(side){}

}