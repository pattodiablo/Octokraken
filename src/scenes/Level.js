
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	editorCreate() {
		
		// background
		const background = this.add.tileSprite(0, 0, 64, 64, "background");
		background.setOrigin(0, 0);
		
		// player
		const player = new Player(this, 296, 276);
		this.add.existing(player);
		
		// heart1
		const heart1 = new Heart(this, 26, 23);
		this.add.existing(heart1);
		
		// heart2
		const heart2 = new Heart(this, 61, 22);
		this.add.existing(heart2);
		
		// heart3
		const heart3 = new Heart(this, 94, 22);
		this.add.existing(heart3);
		
		// Score
		const score = this.add.text(602, 15, "", {});
		score.setOrigin(0.5, 0.5);
		score.text = "SCORE";
		score.setStyle({"color":"#ff0048","fontFamily":"KANIT","fontSize":"20px","stroke":"#"});
		
		// Ultimate
		const ultimate = this.add.text(342, 413, "", {});
		ultimate.setOrigin(0.5, 0.5);
		ultimate.text = "ULTIMATE DEFENSE";
		ultimate.setStyle({"align":"center","color":"#ff0048","fontFamily":"KANIT","fontSize":"20px"});
		
		// Counter
		const counter = this.add.text(685, 18, "", {});
		counter.setOrigin(0.5, 0.5);
		counter.text = "00000";
		counter.setStyle({"color":"#34eacdff","fontFamily":"KANIT"});
		
		// rectangle
		const rectangle = this.add.rectangle(711, 18, 70, 30);
		rectangle.fillColor = 16711752;
		rectangle.isStroked = true;
		rectangle.strokeColor = 16711752;
		
		this.background = background;
		this.player = player;
		this.heart1 = heart1;
		this.heart2 = heart2;
		this.heart3 = heart3;
		this.score = score;
		this.ultimate = ultimate;
		this.counter = counter;
		this.rectangle = rectangle;
	}
	
	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Player} */
	player;
	/** @type {Heart} */
	heart1;
	/** @type {Heart} */
	heart2;
	/** @type {Heart} */
	heart3;
	/** @type {Phaser.GameObjects.Text} */
	score;
	/** @type {Phaser.GameObjects.Text} */
	ultimate;
	/** @type {Phaser.GameObjects.Text} */
	counter;
	/** @type {Phaser.GameObjects.Rectangle} */
	rectangle;
	
	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.scene.scene.cameras.main.fadeIn(1000);
		this.soundtrack01 = this.sound.add('soundtrack01');
		this.soundtrack01.loop = true;
		this.soundtrack01.play();		


		this.physics.world.setBounds(0,0,3000,3000,true,true,true);
		this.cameras.main.setBounds(0, 0, 3000, 3000,true);
		this.cameras.main.startFollow(this.player);
		this.background.width=3000;
		this.background.height=3000;


		this.playerBullets=[];
		this.rectangle.x=document.body.clientWidth-50;
		this.rectangle.setScrollFactor(0, 0);
		this.counter.x=document.body.clientWidth-70;
		this.counter.setScrollFactor(0, 0);
		this.score.x=document.body.clientWidth-160;
		this.score.setScrollFactor(0, 0);
		this.ultimate.setOrigin(0.5,0.5);
		this.ultimate.x=document.body.clientWidth/2;
		this.ultimate.y=document.body.clientHeight-100;
		this.ultimate.setScrollFactor(0, 0);

		this.heart1.setScrollFactor(0, 0);
		this.heart2.setScrollFactor(0, 0);
		this.heart3.setScrollFactor(0, 0);


		this.EnemiesDestroyed = 0;
		this.dificulty = 1;
		this.enemyRatio = 20;
		this.IswaveActive = true;

		this.createEnemyTimer = this.time.addEvent({
			delay: 1500,                // ms
			callback: this.waveVerifier,
			//args: [],
			callbackScope: this,
			loop: true
		});
		
		this.waveLauncher();


		this.createShieldsTimer = this.time.addEvent({
			delay: 8000,                // ms
			callback: this.createAshield,
			//args: [],
			callbackScope: this,
			loop: true
		});

		


	}

	createAshield(){

		const hit20004 = new Shield(this, Phaser.Math.Between(30, document.body.clientWidth),  Phaser.Math.Between(30, document.body.clientHeight));
		this.add.existing(hit20004);


	}

	update (){
		this.counter.text=this.player.score;

	}

	waveLauncher(){
		console.log('estoy en WaveController');
		this.totalEnemies = this.dificulty*this.enemyRatio;
		console.log("this.totalEnemies "+this.totalEnemies);
		console.log("this.EnemiesDestroyed " + this.EnemiesDestroyed);
		if(this.IswaveActive){
			this.lanzarWave();
			console.log('lanzaWave IswaveActive ' + this.IswaveActive);
			this.IswaveActive = false;
		}
		
	

	}

	waveVerifier(){
		if(this.EnemiesDestroyed >= this.totalEnemies){
			this.EnemiesDestroyed = 0;
			this.dificulty++;
			console.log('Incremente Dificultad '+this.dificulty);
			this.IswaveActive = true;
			//this.waveLauncher();
			this.launchBoss();
		}
	}

	launchBoss(){
		const boss = new Boss(this,1500, 1500);
		this.add.existing(boss);
	}
	lanzarWave(){
		var Nenemies1 = Phaser.Math.Between(1,this.totalEnemies/2);
		var Nenemies2 = Phaser.Math.Between(1,Phaser.Math.Between(1,Nenemies1));
		var Nenemies3 = Phaser.Math.Between(1,Phaser.Math.Between(1,Nenemies2));
		var Nenemies4 = Phaser.Math.Between(1,Phaser.Math.Between(1,Nenemies3));
		var Nenemies5 = this.totalEnemies - (Nenemies1+Nenemies2+Nenemies3+Nenemies4);
		console.log("this.totalEnemies " + this.totalEnemies);
		
		this.createEnemy1Timer = this.time.addEvent({
			delay: 100,                // ms
			callback: this.crearEnemy1,
			//args: [],
			callbackScope: this,
			repeat: Nenemies1-1
		});

		this.createEnemy2Timer = this.time.addEvent({
			delay: 100,                // ms
			callback: this.crearEnemy2,
			//args: [],
			callbackScope: this,
			repeat: Nenemies2-1
		});

		this.createEnemy3Timer = this.time.addEvent({
			delay: 100,                // ms
			callback: this.crearEnemy3,
			//args: [],
			callbackScope: this,
			repeat: Nenemies3-1
		});

		this.createEnemy4Timer = this.time.addEvent({
			delay: 100,                // ms
			callback: this.crearEnemy4,
			//args: [],
			callbackScope: this,
			repeat: Nenemies4-1
		});

		this.createEnemy5Timer = this.time.addEvent({
			delay: 100,                // ms
			callback: this.crearEnemy5,
			//args: [],
			callbackScope: this,
			repeat: Nenemies5-1
		});
	}


	crearEnemy1(){
		const enemy1 = new Enemy1(this,Phaser.Math.FloatBetween(0,3000), Phaser.Math.FloatBetween(0,3000))
		this.add.existing(enemy1);

	}

	crearEnemy2(){

		const enemy2 = new Enemy2(this, Phaser.Math.FloatBetween(1500+100,1500+800), Phaser.Math.FloatBetween(1500+100,1500+800));
		this.add.existing(enemy2);
	}

	crearEnemy3(){

		const enemy3 = new Enemy3(this, Phaser.Math.FloatBetween(0,3000), Phaser.Math.FloatBetween(0,3000));
		this.add.existing(enemy3);
	}

	crearEnemy4(){

		const enemy4 = new Enemy4(this, Phaser.Math.FloatBetween(0,3000),Phaser.Math.FloatBetween(400,2600));
		this.add.existing(enemy4);
	}

	crearEnemy5(){

		const enemy5 = new Enemy5(this, Phaser.Math.FloatBetween(0,3000),Phaser.Math.FloatBetween(0,3000));
		this.add.existing(enemy5);
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
