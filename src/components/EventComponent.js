
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class EventComponent {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__EventComponent"] = this;

		/* START-USER-CTR-CODE */
		this.scene = this.gameObject.scene;

		this.scene.events.once("update", () => this.start());

		this.scene.events.on("update", this.update, this);
		this.gameObject.on("destroy", () => {

			this.scene.events.off("update", this.update, this);
		});

		/* END-USER-CTR-CODE */
	}

	/** @returns {EventComponent} */
	static getComponent(gameObject) {
		return gameObject["__EventComponent"];
	}

	/** @type {Phaser.GameObjects.GameObject} */
	gameObject;

	/* START-USER-CODE */

	start() {
		// nothing
	}

	update() {
		// nothing
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
