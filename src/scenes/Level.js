
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
		const ganasteLabel = this.add.sprite(395, 675, "ganasteLabel");

		// scoreText
		const scoreText = this.add.text(313, 148, "", {});
		scoreText.text = "00000\n";
		scoreText.setStyle({ "fontFamily": "Arial", "fontSize": "36px", "fontStyle": "bold" });

		// alertHalo
		const alertHalo = this.add.image(0, 0, "alertHalo");

		// messageWindow
		const messageWindow = this.add.image(88, 548, "messageWindow");

		// mensaje1
		const mensaje1 = new MensajeRandom(this, 462, 589);
		this.add.existing(mensaje1);

		// onLogo
		const onLogo = this.add.image(665, 538, "onLogo");

		// jugarBtn
		const jugarBtn = this.add.image(371, 666, "jugarBtn");

		// shareBtn
		const shareBtn = this.add.image(374, 800, "shareBtn");

		// lists
		const enemigos = [];

		this.background = background;
		this.player = player;
		this.moon = moon;
		this.powerText = powerText;
		this.shipShield = shipShield;
		this.kraken = kraken;
		this.ganasteLabel = ganasteLabel;
		this.scoreText = scoreText;
		this.alertHalo = alertHalo;
		this.messageWindow = messageWindow;
		this.mensaje1 = mensaje1;
		this.onLogo = onLogo;
		this.jugarBtn = jugarBtn;
		this.shareBtn = shareBtn;
		this.enemigos = enemigos;

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
	/** @type {Phaser.GameObjects.Image} */
	alertHalo;
	/** @type {Phaser.GameObjects.Image} */
	messageWindow;
	/** @type {MensajeRandom} */
	mensaje1;
	/** @type {Phaser.GameObjects.Image} */
	onLogo;
	/** @type {Phaser.GameObjects.Image} */
	jugarBtn;
	/** @type {Phaser.GameObjects.Image} */
	shareBtn;
	/** @type {Array<any>} */
	enemigos;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.youwin01 = this.sound.add('youwin01');
		this.youwin01.loop = false;

		this.editorCreate();
		this.scene.scene.cameras.main.fadeIn(1000);


		this.powerText.x=80;
		this.powerText.y=26;
		this.powerText.depth=3;

		this.moon.x=this.cameras.main.width/2;
		this.moon.y=this.cameras.main.height/3;

		this.onLogo.x=this.moon.x;
		this.onLogo.y=this.moon.y;
		this.onLogo.visible=false;

		this.physics.world.setBounds(0,0,540,960,true,true,true);
		this.cameras.main.setBounds(0, 0, 540, 960,true);
		this.cameras.main.startFollow(this.player);
		this.background.width=540;
		this.background.height=960;

		this.ganasteLabel.x=this.scene.scene.cameras.main.width/2;
		this.ganasteLabel.y=this.scene.scene.cameras.main.height/2+130;
		this.ganasteLabel.visible=false;
		this.ganasteLabel.setScale(0.1);
		this.ganasteLabel.setDepth(3);

		this.scoreText.x=this.scene.scene.cameras.main.width/2;
		this.scoreText.y=100;
		this.scoreText.setOrigin(0.5,0.5);
		this.score=0;

		this.wavesUntilKraken = 10;
		this.currentWave=1;
		this.enemiesInRow = 4;

		this.alertHalo.x = this.scene.scene.cameras.main.width/2;
		this.alertHalo.y =this.scene.scene.cameras.main.height/2;
		this.alertHalo.visible=false;



		this.messageWindow.x = this.scene.scene.cameras.main.width/2;
		this.messageWindow.y =-this.scene.scene.cameras.main.height;
		this.messageWindow.visible=false;
		this.messageWindow.setDepth(2);

		this.mensaje1.x = this.scene.scene.cameras.main.width/2;
		this.mensaje1.y =this.scene.scene.cameras.main.height/2;
		this.mensaje1.visible=false;
		this.mensaje1.scale=0.1;
		this.mensaje1.setDepth(2);

		this.canAttackPulpo=true;

		this.jugarBtn.x=this.scene.scene.cameras.main.width/2;
		this.jugarBtn.visible=false;
		this.jugarBtn.setInteractive().on('pointerup', this.iniciarJuego,this);

		this.shareBtn.x=this.scene.scene.cameras.main.width/2;
		this.shareBtn.visible=true;
		this.shareBtn.setInteractive().on('pointerup', this.game.shareEvent,this);

		this.playerBullets=[];
		this.enemies=[];
		this.mainEnemy=[];
		this.createParticlesQuito();

		this.createFirstEnemy = this.time.addEvent({
			delay: 5000,                // ms
			callback: function(){
				this.createEnemies();
			},
			//args: [],
			callbackScope: this,
			loop: false
		});


		this.createPlayerEnergyBar();

		//this.kraken.aparecer();
		this.generateRandomPulpoAttack();
		this.showLogoSometimes();

	}

	iniciarJuego(){
		location.reload(true);
	}

	showLogoSometimes(){

		this.showLogoTimer = this.time.addEvent({
			delay: 4000,                // ms
			callback: function(){

				this.probabilidadATTACK = Phaser.Math.Between(1, 20);

				if(this.probabilidadATTACK>15){
					if(!this.onLogo.visible){
						this.onLogo.visible=true;
					}else{
						this.onLogo.visible=false;
					}

				}
			},
			//args: [],
			callbackScope: this,
			loop: true
		});
	}

	generateRandomPulpoAttack(){

		this.tweens.add({
			targets: this.onLogo,
			alpha: 0.7,
			yoyo:true,
			duration: 250,
			ease: 'Bounce',

			onCompleteScope:this,
			repeat: -1,
		});
		this.attackTimer = this.time.addEvent({
			delay: 4000,                // ms
			callback: function(){
				this.probabilidadATTACK = Phaser.Math.Between(1, 20);

				if(this.probabilidadATTACK>15){
					if(this.canAttackPulpo){
						this.generarPulpoAttack();
						this.canAttackPulpo=false;
					}

				}
			},
			//args: [],
			callbackScope: this,
			loop: true
		});


	}

	generarPulpoAttack(){

		this.alertHaloEnabled();


	}

	alertHaloEnabled(){
		this.alertHalo.visible=true;
		this.messageWindow.visible=true;
		this.mensaje1.visible=true;
		this.mensaje1.generarMensaje();

		this.tweens.add({
			targets: this.alertHalo,
			scale: 1.3,
			yoyo:true,
			duration: 250,
			ease: 'Bounce',
			onComplete: function(){
				this.alertHalo.visible=false;
			},
			onCompleteScope:this,
			repeat: 5,
		});

		var textoMensaje = this.tweens.createTimeline();
		textoMensaje.add({
			targets: this.mensaje1,
			scale:1,
			duration: 100,
			ease: 'BounceIn',
			repeat: 0,
			callbackScope: this,

		});
		textoMensaje.add({
			targets: this.mensaje1,
			scale:0.8,
			duration: 300,
			ease: 'BounceIn',
			repeat: 4,
			yoyo:true,
			callbackScope: this,

		});
		textoMensaje.add({
			targets: this.mensaje1,
			scale:0.1,
			duration: 200,
			ease: 'BounceOut',
			repeat: 0,

			onComplete:function(){
				this.mensaje1.visible=false
				const brazoPulpo = new BrazoPulpo(this, Phaser.Math.Between(50,500), 474);
				this.add.existing(brazoPulpo);
			},
			callbackScope: this,

		});

		textoMensaje.play();

		var ventanaMensaje = this.tweens.createTimeline();
		ventanaMensaje.add({
			targets: this.messageWindow,
			y: this.scene.scene.cameras.main.height/2,
			duration: 300,
			ease: 'BounceIn',
			repeat: 0,
			callbackScope: this,

		});

		ventanaMensaje.add({
			targets: this.messageWindow,
			y: this.scene.scene.cameras.main.height/2,
			duration: 3000,
			ease: 'Linear',
			repeat: 0,
			callbackScope: this,

		});

		ventanaMensaje.add({
			targets: this.messageWindow,
			y: -this.scene.scene.cameras.main.height,
			duration: 300,
			ease: 'BounceOut',
			repeat: 0,
			callbackScope: this,

		});

		ventanaMensaje.play();

	}

	ganaste() {

		this.youwin01.play();

		this.jugarBtn.visible=true;

		this.tweens.add({
			targets: this.jugarBtn,
			scale: 0.9,
			duration: 500,
			ease: 'Bounce',
			repeat: 0,
		});

		this.ganasteLabel.visible=true;

		this.player.stopPlay();
		this.tweens.add({
			targets: this.ganasteLabel,
			scale: 1,
			duration: 200,
			ease: 'Bounce',
			repeat: 0,
		});

		this.tweens.add({
			targets: this.scoreText,
			scale: 2,
			y:120,
			duration: 500,
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
	crearPowerUps(){
		this.crearPowerUps = this.time.addEvent({
			delay: 500,                // ms
			callback: function(){
				const powerUp = new PowerUp(this, Phaser.Math.Between(40,500), this.cameras.main.height+30);
				this.add.existing(powerUp);
			},
			//args: [],
			callbackScope: this,
			loop: true
		});
	}

	createEnemies(){


				if(this.currentWave>this.wavesUntilKraken){

					this.crearPowerUps()
					this.kraken.aparecer();
					this.enemyCreationTimer.destroy();
				}else{
					this.enemiestoCreate = this.currentWave*3;
					if(this.enemiestoCreate>=13){
						this.enemiestoCreate=13;
					}
					this.rowsTocreate = this.enemiestoCreate/this.enemiesInRow;

				for(var j=0; j<=this.rowsTocreate; j++){
					for(var i=0; i<=this.enemiesInRow; i++){
					this.wichEnemy = Phaser.Math.Between(1, 3);
					switch(this.wichEnemy ){
						case 1:
							const enemy1 = new Enemy1(this, i*90+90, 970+j*90);
							this.add.existing(enemy1);
						break;

						case 2:
							const enemy2 = new Enemy2(this, i*90+90, 970+j*90);
							this.add.existing(enemy2);
						break;

						case 3:
							const enemy3= new Enemy3(this, i*90+90, 970+j*90);
							this.add.existing(enemy3);
						break;

						default:
							const enemy4= new Enemy1(this, i*90+90, 970+j*90);
							this.add.existing(enemy4);
						break;
					}

					}
				}
				}

			if(this.currentWave<11){

						this.enemyCreationTimer = this.time.addEvent({
						delay: Phaser.Math.Between(5000, 11000),                // ms
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
