
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
		const background = this.add.tileSprite(0, 0, 64, 64, "iniBg");
		background.setOrigin(0, 0);

		// patoTitle
		const patoTitle = this.add.image(413, 327, "patoTitle");

		// jugarBtn
		const jugarBtn = this.add.sprite(420, 382, "jugarBtn");

		// patoFlying
		const patoFlying = this.add.image(-34, 236, "patoFlying");

		this.background = background;
		this.patoTitle = patoTitle;
		this.jugarBtn = jugarBtn;
		this.patoFlying = patoFlying;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	patoTitle;
	/** @type {Phaser.GameObjects.Sprite} */
	jugarBtn;
	/** @type {Phaser.GameObjects.Image} */
	patoFlying;

	/* START-USER-CODE */

	// Write your code here

	create() {
		


		this.splash_screen = this.sound.add('splash_screen');
		this.splash_screen.loop = false;
		this.splash_screen.play();

		this.editorCreate();
		this.jugarBtn.x=this.cameras.main.centerX;
		this.jugarBtn.y=this.cameras.main.height+100;
		
		this.jugarBtn.setInteractive().on('pointerup', this.iniciarJuego,this);

		this.patoTitle.x=this.cameras.main.centerX;
		this.patoTitle.y=this.cameras.main.centerY;

		this.patoFlying.x=this.cameras.main.centerX;
		this.patoFlying.y=this.cameras.main.centerY;

		this.background.width=3000;
		this.background.height=3000;

		this.background.setInteractive().on('pointerup', this.onFocus,this);

		this.animateStuff();

	}

	onFocus(){
		var showBtn = this.tweens.createTimeline();
		showBtn.add({
			targets: this.jugarBtn,
			y: this.cameras.main.centerY+340,
			duration: 300,
			ease: 'Linear',
		
			repeat: 0

		});
		showBtn.play();
	}

	animateStuff(){

		var animateFlying = this.tweens.createTimeline();
		animateFlying.add({
			targets: this.patoFlying,
			y: this.cameras.main.centerY+20,
			duration: 1000,
			ease: 'Linear',
			yoyo:true,
			repeat: -1

		});
		animateFlying.play();

		var animateJugarBtn = this.tweens.createTimeline();
		animateJugarBtn.add({
			targets: this.jugarBtn,
			scale:1.1,
			duration: 500,
			ease: 'Bounce',
			yoyo:true,
			repeat: -1

		});
		animateJugarBtn.play();

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
