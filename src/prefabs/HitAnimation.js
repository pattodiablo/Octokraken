
// You can write more code here

/* START OF COMPILED CODE */

class HitAnimation extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "playerAnimations", frame ?? "hit30006");

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	explodeType = 1;

	/* START-USER-CODE */

	create(){
		this.explodeType=1;

		switch(this.explodeType){
			case 1:
				this.play("hit2",true);
			break;

			case 2:
				this.play("hit1",true);
			break;

			case 3:
				this.play("hit3",true);
			break;
		}


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
