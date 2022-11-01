
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// iniLogo
		const iniLogo = this.add.image(396, 243, "iniLogo");

		this.iniLogo = iniLogo;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	iniLogo;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();



		this.iniLogo.x = this.cameras.main.centerX;
		this.iniLogo.y = this.cameras.main.centerY;

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Inicio"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
