
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

		// particles
		const particles = new ParticleQuito(this, 412, 347);
		this.add.existing(particles);

		// HitAnimation
		const hitAnimation = new HitAnimation(this, 517, 340);
		this.add.existing(hitAnimation);

		// powerUp
		const powerUp = new PowerUp(this, 434, 1135);
		this.add.existing(powerUp);

		this.background = background;
		this.player = player;
		this.moon = moon;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Player} */
	player;
	/** @type {Phaser.GameObjects.Image} */
	moon;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.scene.scene.cameras.main.fadeIn(1000);
		this.soundtrack01 = this.sound.add('soundtrack01');
		this.soundtrack01.loop = true;
		//this.soundtrack01.play();		


		this.moon.x=this.cameras.main.width/2;
		this.moon.y=this.cameras.main.height/3;

		this.physics.world.setBounds(0,0,540,960,true,true,true);
		this.cameras.main.setBounds(0, 0, 540, 960,true);
		this.cameras.main.startFollow(this.player);
		this.background.width=540;
		this.background.height=960;

		this.wavesUntilKraken = 10;
		this.currentWave=1;
		this.enemiesInRow = 5;

		this.playerBullets=[];
		this.enemies=[];
		this.createParticlesQuito();
		this.createEnemies();
		this.createPlayerEnergyBar();

	}

	createPlayerEnergyBar(){
		
		this.lifeVisual2 = this.add.rectangle(70, 80, 400, 80, 0xEA1992,0.7);
		this.lifeVisual2.setOrigin(0,0.5);

		this.lifeVisual = this.add.rectangle(70, 80, 400, 80, 0xEA1992,0);
		this.lifeVisual.setOrigin(0,0.5);
		this.lifeVisual.setStrokeStyle(4, 0xffffff);

		
	
	}

	createEnemies(){
			console.log("current wave " + this.currentWave)
				if(this.currentWave>this.wavesUntilKraken){
					console.log("crear kraken");
					this.enemyCreationTimer.destroy();
				}else{
					this.enemiestoCreate = this.currentWave*5;
					this.rowsTocreate = this.enemiestoCreate/this.enemiesInRow;
				for(var j=0; j<=this.rowsTocreate; j++){
					for(var i=0; i<=this.enemiesInRow; i++){
					const enemy1 = new Enemy1(this, i*75+75, 960+j*70);
					this.add.existing(enemy1);
					}
				}
				}


			this.enemyCreationTimer = this.time.addEvent({
			delay: 4000*this.currentWave,                // ms
			callback: this.createEnemies,
			//args: [],
			callbackScope: this,
			loop: false
			});

			this.currentWave++;





	}

	createParticlesQuito(){

		for(var i=0; i<=30; i++){
			const particles = new ParticleQuito(this, Phaser.Math.Between(10, 500), Phaser.Math.Between(0, 960));
			this.add.existing(particles);

		}
	}

	update (){

			
				
		


	}






	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
