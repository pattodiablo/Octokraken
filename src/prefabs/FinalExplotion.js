
// You can write more code here

/* START OF COMPILED CODE */

class FinalExplotion extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "explosion", frame ?? "EXP_04.png");

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;
		thus.enemy_destroy.play();	
		this.play("explosion1", true);

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
