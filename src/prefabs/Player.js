
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 418, y ?? 161, texture || "playerPato", frame);

		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

create(){
	this.scene.physics.world.enableBody(this);
	this.body.setCollideWorldBounds(true);



	this.isMouseDown = false;
	this.y=this.scene.cameras.main.height/3;
	
	this.scene.input.on('pointerdown', function (pointer) { 

		this.currentMouseY = this.scene.input.y;
		this.currentMouseX= this.scene.input.x;
	

		this.isMouseDown=true;

	}, this);

	this.scene.input.on('pointerup', function (pointer) { 	
		this.isMouseDown=false;

	}, this);

	

		this.crearParticulas();
		this.defaultIdleAnim();

		this.laser_shot = this.scene.sound.add('laser_shot');
		this.laser_shot.loop = false;

		this.hurt = this.scene.sound.add('hurt');
		this.hurt.loop = false;

		this.travel = this.scene.sound.add('travel');
		this.travel.loop = true;

}

defaultIdleAnim(){

	
}

crearParticulas() {
	var k = 3;
	var rose = {
		getPoints: function (quantity, stepRate) {
			if (!stepRate) {
				stepRate = Phaser.Math.PI2 / quantity;
			}

			var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
			var output = new Array(input.length);

			for (var i = 0; i < input.length; i++) {
				var angle = input[i];
				output[i] = new Phaser.Math.Vector2().setToPolar(angle, 10 * Math.cos(k * angle));
			}

			return output;
		}
	};
	this.particles = this.scene.add.particles('flares');
	var tree = new Phaser.Geom.Triangle.BuildEquilateral(0, -10, 40);
	this.particles.createEmitter({
		frame: "flare20000",
		scale: { start: 1, end: 0.1 },
		blendMode: 'ADD',
		lifespan: 300,
		//	emitZone: { type: 'edge', source: rose, quantity: 360 },
		follow: this
	});
	var supaCurrentDepth = this.depth;

	this.setDepth(supaCurrentDepth+1);


}



update(){



	if(this.isMouseDown){
		this.yDiff=this.currentMouseY-this.scene.input.y;
		this.xDiff=this.currentMouseX-this.scene.input.x;
		this.y-=this.yDiff/20;
		this.x-=this.xDiff/10;

		if(this.y>this.scene.cameras.main.height/3){
			this.y=this.scene.cameras.main.height/3;
		}
}


}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
