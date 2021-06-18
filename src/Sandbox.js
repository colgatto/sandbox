class Sandbox{

	constructor(width, height){
		this.width = width;
		this.height = height;
		this.armies = [];
		this.armiesL = 0;
		this.backgroundColor = 220;
		this.UI = new Ui(1,1,100,20);
	}

	addArmy(opt){
		this.armies.push( new Army(opt) );
		this.armiesL++;
	}

	forEachArmy(cb){
		for (let i = 0; i < this.armiesL; i++) {
			cb(this.armies[i]);
		}
	}

	setup(){

		createCanvas(this.width, this.height);
		frameRate(60);

		this.forEachArmy( a => a.setup() );
		this.forEachArmy( a => a.init() );
	}

	draw(){
		background(this.backgroundColor);
		
		this.forEachArmy( a => a.update() );
		this.forEachArmy( a => a.updatePosition() );
		this.forEachArmy( a => a.drawPath() );
		this.forEachArmy( a => a.draw() );

		this.UI.update();
		this.UI.draw();
	}

}