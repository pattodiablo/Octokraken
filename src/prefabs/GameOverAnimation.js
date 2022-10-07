
// You can write more code here

/* START OF COMPILED CODE */

class GameOverAnimation extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "explosion", frame ?? "GameOverpng10.png");

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

create(){
	this.play("GameOver",true);
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
