
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(0, 0, 64, 64, "background");
		background.setOrigin(0, 0);

		// player
		const player = new Player(this, 43, 51);
		this.add.existing(player);

		this.background = background;
		this.player = player;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Player} */
	player;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.scene.scene.cameras.main.fadeIn(1000);
		this.soundtrack01 = this.sound.add('soundtrack01');
		this.soundtrack01.loop = true;
		this.soundtrack01.play();		


		this.physics.world.setBounds(0,0,1080,1920,true,true,true);
		this.cameras.main.setBounds(0, 0, 1080, 1920,true);
		this.cameras.main.startFollow(this.player);
		this.background.width=3000;
		this.background.height=3000;

		this.playerBullets=[];


	}



	update (){


	}






	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
