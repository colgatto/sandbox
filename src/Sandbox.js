class Sandbox{

	constructor(width, height){
		this.width = width;
		this.height = height;
		this.armies = [];
		this.armiesL = 0;
		this.backgroundColor = 220;
		this.paused = false;
		this.UI = new Ui(1,1,100,20);
	}

	togglePause(){
		this.paused = !this.paused;
		if(this.paused){
			frameRate(0);
			noLoop();
		}else{
			frameRate(60);
			loop();
		}
	}

	addArmy(opt){
		this.armies.push( new Army(opt) );
		this.armiesL++;
	}

	addBot(army, x, y){
		for (let i = 0; i < this.armiesL; i++) {
			if(this.armies[i].name == army){
				this.armies[i].addBot(x, y);
				return true;
			}
		}
		return false;
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