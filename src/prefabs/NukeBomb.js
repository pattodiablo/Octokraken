
// You can write more code here

/* START OF COMPILED CODE */

class NukeBomb extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "explodeFinal", frame ?? "slice9.png");

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.visible=false;
		this.scene.physics.world.enableBody(this);
		this.body.enable=false;
	}

	explode(){
		this.visible=true;
		this.play("nuke", true);
		this.body.enable=true;

		console.log(this.scene.enemies)
		this.scene.enemies.forEach(enemy => {
			enemy.destroyByNuke();
		});
		this.scene.kraken.nukeKraken();
		this.scene.berenjeBomba.visible=false;
		this.scene.berenjeBomba.alpha=100;
		this.scene.berenjeBomba.scale=1;
		this.scene.bombBtn.isArmed=false;
	}
	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
