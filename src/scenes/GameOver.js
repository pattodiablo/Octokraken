
// You can write more code here

/* START OF COMPILED CODE */

class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// jugarBtn
		const jugarBtn = this.add.sprite(373, 391, "rejugarBtn");

		// gameOverAnim
		const gameOverAnim = new GameOverAnimation(this, 369, 224);
		this.add.existing(gameOverAnim);

		this.jugarBtn = jugarBtn;
		this.gameOverAnim = gameOverAnim;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	jugarBtn;
	/** @type {GameOverAnimation} */
	gameOverAnim;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.scene.scene.cameras.main.fadeIn(1000);
		this.gameOverAnim.x=this.scene.scene.cameras.main.centerX;
		this.jugarBtn.x=this.scene.scene.cameras.main.centerX;
		this.jugarBtn.setInteractive().on('pointerup', this.iniciarJuego,this);
	}

	iniciarJuego(){

		window.location.reload();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
