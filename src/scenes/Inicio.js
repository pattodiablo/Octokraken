
// You can write more code here

/* START OF COMPILED CODE */

class Inicio extends Phaser.Scene {

	constructor() {
		super("Inicio");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(0, 0, 64, 64, "background");
		background.setOrigin(0, 0);

		// splashArt
		const splashArt = this.add.image(405, 312, "splash_art");

		// botonera
		const botonera = this.add.sprite(418, 404, "botonera");

		// jugarBtn
		const jugarBtn = this.add.sprite(420, 382, "jugarBtn");

		// creditos
		const creditos = this.add.sprite(418, 487, "creditos");

		// logo
		const logo = this.add.sprite(430, 294, "logo");

		this.background = background;
		this.splashArt = splashArt;
		this.botonera = botonera;
		this.jugarBtn = jugarBtn;
		this.creditos = creditos;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	splashArt;
	/** @type {Phaser.GameObjects.Sprite} */
	botonera;
	/** @type {Phaser.GameObjects.Sprite} */
	jugarBtn;
	/** @type {Phaser.GameObjects.Sprite} */
	creditos;
	/** @type {Phaser.GameObjects.Sprite} */
	logo;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.splash_screen = this.sound.add('splash_screen');
		this.splash_screen.loop = true;
		this.splash_screen.play();

		this.editorCreate();
		this.jugarBtn.x=this.cameras.main.centerX+320;
		this.jugarBtn.y=this.cameras.main.centerY+50;
		this.jugarBtn.setInteractive().on('pointerup', this.iniciarJuego,this);

		this.creditos.x=this.cameras.main.centerX+320;
		this.creditos.y=this.cameras.main.centerY+150;
		this.creditos.setInteractive().on('pointerup', this.mostrarCreditos,this);

		this.background.width=3000;
		this.background.height=3000;

		this.splashArt.setOrigin(0,0);
		this.splashArt.x=0;
		this.splashArt.y=0;
		this.splashArt.displayWidth=document.body.clientWidth;
		this.splashArt.displayHeight=document.body.clientHeight;

		this.logo.setScale(0.6,0.6);
		this.logo.x = 400;
		this.logo.y = 200;

		this.botonera.setScale(0.6,0.6);
		this.botonera.x = this.cameras.main.centerX+350;
		this.botonera.y =  this.cameras.main.centerY+100;;
	}

	mostrarCreditos(){

		this.splash_screen.stop();
		this.scene.start('Creditos');
	}

	iniciarJuego(){
		this.splash_screen.stop();
		this.scene.start('Level');
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
