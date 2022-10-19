
// You can write more code here

/* START OF COMPILED CODE */

class ParticleQuito extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "particles", frame);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

		create(){
			
			this.ParticleVelo = Phaser.Math.Between(0, 10)
			this.alpha=0.5;

		}

		update(){
			this.y+=this.ParticleVelo;
			if(this.y>1930){
				this.y=-10;
			}
		}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
