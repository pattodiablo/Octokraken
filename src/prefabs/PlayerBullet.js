
// You can write more code here

/* START OF COMPILED CODE */

class PlayerBullet extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "playerBullet", frame);

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.scene.physics.world.enableBody(this);
		this.scene.physics.velocityFromRotation(this.scene.player.rotation, 800, this.body.velocity);
		this.crearParticulas();
		this.rotation=this.scene.player.rotation;
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
			frame: "flare10000",
			scale: { start: 0.4, end: 0.1 },
			blendMode: 'ADD',
			lifespan: 300,
			//	emitZone: { type: 'edge', source: rose, quantity: 360 },
			follow: this
		});
	

	
	
	}

	update(){
		if(this.x<0){
			this.particles.destroy();
			this.destroy();
		}
		if(this.x>3000){
			this.particles.destroy();
			this.destroy();
		}

		if(this.y<0){
			this.particles.destroy();
			this.destroy();
		}

		if(this.y>3000){
			this.particles.destroy();
			this.destroy();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
