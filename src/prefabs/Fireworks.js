
// You can write more code here

/* START OF COMPILED CODE */

class Fireworks extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "slime", frame ?? "firework_2_01.png");

		this.scaleX = 0.3;
		this.scaleY = 0.3;

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;
		this.enemy_destroy.play();	
		this.play("fireworks", true);

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
