
// You can write more code here

/* START OF COMPILED CODE */

class Creditos extends Phaser.Scene {

	constructor() {
		super("Creditos");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(0, 0, 64, 64, "background");
		background.setOrigin(0, 0);

		// jugarBtn
		const jugarBtn = this.add.sprite(400, 539, "jugarBtn");

		// CreditsPanel
		const creditsPanel = this.add.text(247, 45, "", {});
		creditsPanel.text = "-- Arte y Diseño --\nKaithzer Morejón\nPaz Rodríguez\nCamilo Dexsidia\nKama Tenesaca\n\n-- Música --\nAgustín Carrión\nFalcon Light\n\n-- Project Manager --\nRuth Valverde\n\n-- Programación --\nRicardo Piedra\nDiego León\nPatricio León (Weveana)\n";
		creditsPanel.setStyle({ "align": "center", "fontFamily": "Kanit", "fontSize": "32px" });

		this.background = background;
		this.jugarBtn = jugarBtn;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Sprite} */
	jugarBtn;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.jugarBtn.x=this.cameras.main.centerX;
		this.jugarBtn.setInteractive().on('pointerup', this.iniciarJuego,this);

		this.background.width=3000;
		this.background.height=3000;
	}

	iniciarJuego(){

		this.scene.start('Level');
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
