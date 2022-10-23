
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
		const background = this.add.tileSprite(0, 0, 64, 64, "backgroundKraken");
		background.setOrigin(0, 0);

		// player
		const player = new Player(this, 43, 51);
		this.add.existing(player);

		// moon
		const moon = this.add.image(169, 404, "moon");

		// powerText
		const powerText = this.add.text(40, 208, "", {});
		powerText.text = "PATO POWER";
		powerText.setStyle({ "fontFamily": "Arial", "fontSize": "26px", "fontStyle": "bold" });

		// shipShield
		const shipShield = new ShipShield(this, 337, 366);
		this.add.existing(shipShield);

		// kraken
		const kraken = new Oktokraken(this, 442, 620);
		this.add.existing(kraken);

		// ganasteLabel
		const ganasteLabel = this.add.sprite(395, 291, "ganasteLabel");

		// scoreText
		const scoreText = this.add.text(313, 148, "", {});
		scoreText.text = "00000\n";
		scoreText.setStyle({ "fontFamily": "Arial", "fontSize": "36px", "fontStyle": "bold" });

		this.background = background;
		this.player = player;
		this.moon = moon;
		this.powerText = powerText;
		this.shipShield = shipShield;
		this.kraken = kraken;
		this.ganasteLabel = ganasteLabel;
		this.scoreText = scoreText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Player} */
	player;
	/** @type {Phaser.GameObjects.Image} */
	moon;
	/** @type {Phaser.GameObjects.Text} */
	powerText;
	/** @type {ShipShield} */
	shipShield;
	/** @type {Oktokraken} */
	kraken;
	/** @type {Phaser.GameObjects.Sprite} */
	ganasteLabel;
	/** @type {Phaser.GameObjects.Text} */
	scoreText;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.scene.scene.cameras.main.fadeIn(1000);
		this.soundtrack01 = this.sound.add('soundtrack01');
		this.soundtrack01.loop = true;
		//this.soundtrack01.play();		

		this.powerText.x=80;
		this.powerText.y=26;
		this.powerText.depth=3;

		this.moon.x=this.cameras.main.width/2;
		this.moon.y=this.cameras.main.height/3;

		this.physics.world.setBounds(0,0,540,960,true,true,true);
		this.cameras.main.setBounds(0, 0, 540, 960,true);
		this.cameras.main.startFollow(this.player);
		this.background.width=540;
		this.background.height=960;

		this.ganasteLabel.x=this.scene.scene.cameras.main.width/2;
		this.ganasteLabel.y=this.scene.scene.cameras.main.height/2;
		this.ganasteLabel.visible=false;
		this.ganasteLabel.setScale(0.1);

		this.scoreText.x=this.scene.scene.cameras.main.width/2;
		this.scoreText.y=100;
		this.scoreText.setOrigin(0.5,0.5);
		this.score=0;

		this.wavesUntilKraken = 10;
		this.currentWave=1;
		this.enemiesInRow = 4;

		this.playerBullets=[];
		this.enemies=[];
		this.mainEnemy=[];
		this.createParticlesQuito();
		this.createEnemies();
		this.createPlayerEnergyBar();



	}

	ganaste(){

		this.ganasteLabel.visible=true;

		this.player.stopPlay();
		this.tweens.add({
			targets: this.ganasteLabel,
			scale: 1,
			duration: 200,
			ease: 'Bounce',
			repeat: 0,
		});





	}

	createPlayerEnergyBar(){

		this.lifeVisual2 = this.add.rectangle(70, 40, 400, 40, 0xEA1992,0.7);
		this.lifeVisual2.setOrigin(0,0.5);

		this.lifeVisual = this.add.rectangle(70, 40, 400, 40, 0xEA1992,0);
		this.lifeVisual.setOrigin(0,0.5);
		this.lifeVisual.setStrokeStyle(4, 0xffffff);
		this.lifeVisual.depth=3



	}

	createEnemies(){
			console.log("current wave " + this.currentWave)

				if(this.currentWave>this.wavesUntilKraken){
					console.log("crear kraken");
					this.kraken.aparecer();
					this.enemyCreationTimer.destroy();
				}else{
					this.enemiestoCreate = this.currentWave*3;
					if(this.enemiestoCreate>=18){
						this.enemiestoCreate=18;
					}
					this.rowsTocreate = this.enemiestoCreate/this.enemiesInRow;
					console.log("rows  to create " + this.rowsTocreate )
				for(var j=0; j<=this.rowsTocreate; j++){
					for(var i=0; i<=this.enemiesInRow; i++){
					this.wichEnemy = Phaser.Math.Between(1, 3);
					switch(this.wichEnemy ){
						case 1:
							const enemy1 = new Enemy1(this, i*90+90, 960+j*70);
							this.add.existing(enemy1);
						break;

						case 2:
							const enemy2 = new Enemy2(this, i*90+90, 960+j*70);
							this.add.existing(enemy2);
						break;

						case 3:
							const enemy3= new Enemy3(this, i*90+90, 960+j*70);
							this.add.existing(enemy3);
						break;

						default:
							const enemy4= new Enemy1(this, i*90+90, 960+j*70);
							this.add.existing(enemy4);
						break;
					}

					}
				}
				}

			if(this.currentWave<11){

						this.enemyCreationTimer = this.time.addEvent({
						delay: Phaser.Math.Between(4000, 11000),                // ms
						callback: this.createEnemies,
						//args: [],
						callbackScope: this,
						loop: false
						});

						this.currentWave++;
			}





	}

	createParticlesQuito(){

		for(var i=0; i<=30; i++){
			const particles = new ParticleQuito(this, Phaser.Math.Between(10, 500), Phaser.Math.Between(0, 960));
			this.add.existing(particles);

		}
	}

	update (){


		this.scoreText.text = this.score;



	}






	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
