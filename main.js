const armies = {

	c: new Army({
		name: config.cacciatori.name,
		color: config.cacciatori.color,
		size: config.cacciatori.size,
		count: config.cacciatori.count,
		nearDist: config.cacciatori.nearDist,
		drawPath: config.cacciatori.drawPath,
		botClass: config.cacciatori.botClass
	}),
	
	p: new Army({
		name: config.prede.name,
		color: config.prede.color,
		size: config.prede.size,
		count: config.prede.count,
		nearDist: config.prede.nearDist,
		drawPath: config.prede.drawPath,
		botClass: config.prede.botClass
	}),

	cibo: new Army({
		name: config.cibo.name,
		color: config.cibo.color,
		size: config.cibo.size,
		count: config.cibo.count,
		speed: config.cibo.speed,
		botClass: config.cibo.botClass
	})

};
