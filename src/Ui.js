class Ui{
	constructor(x,y,w,h){
		this.loopCounter = 0;
		this.currentFrameRate = 0;
		this.frameRatesList = [];
		this.x1 = x;
		this.y1 = y;
		this.x2 = this.x1 + w;
		this.y2 = this.y1 + h;
	}
	update(){
		this.frameRatesList.push(Math.floor(frameRate()));
		if(this.loopCounter % 20 == 0){
			this.currentFrameRate = 0;
			let l = this.frameRatesList.length;
			for (let i = 0; i < l; i++) {
				this.currentFrameRate += this.frameRatesList[i];
			}
			this.currentFrameRate = Math.floor(this.currentFrameRate/l);
			this.frameRatesList = [];
		}
		this.loopCounter++;
	}
	draw(){
		fill(0);
		text('FPS: ' + this.currentFrameRate, this.x1, this.y1, this.x2, this.y2);	
	}
}