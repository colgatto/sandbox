class Sandbox{

	constructor(width, height){
		this.width = width;
		this.height = height;
		this.groups = [];
		this.groupsL = 0;
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

	addGroup(opt){
		this.groups.push( new Group(opt) );
		this.groupsL++;
	}

	addEntity(group, x, y){
		for (let i = 0; i < this.groupsL; i++) {
			if(this.groups[i].name == group){
				this.groups[i].addEntity(x, y);
				return true;
			}
		}
		return false;
	}

	forEachGroup(cb){
		for (let i = 0; i < this.groupsL; i++) {
			cb(this.groups[i]);
		}
	}

	setup(){

		createCanvas(this.width, this.height);
		frameRate(60);

		this.forEachGroup( a => a.setup() );
		this.forEachGroup( a => a.init() );
	}

	draw(){
		background(this.backgroundColor);
		
		this.forEachGroup( a => a.update() );
		this.forEachGroup( a => a.updatePosition() );
		this.forEachGroup( a => a.drawPath() );
		this.forEachGroup( a => a.draw() );

		this.UI.update();
		this.UI.draw();
	}

}