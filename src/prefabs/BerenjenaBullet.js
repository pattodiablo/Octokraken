
// You can write more code here

/* START OF COMPILED CODE */

class BerenjenaBullet extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "berenjenaBullet", frame);

		/* START-USER-CTR-CODE */

		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
	
		this.scene.playerBullets.push(this);
		this.scene.physics.world.enableBody(this);
		//this.scene.physics.velocityFromRotation(this.scene.player.rotation, 800, this.body.velocity);
		this.body.velocity.y=1500;
		this.body.gravity.y=90;
		this.crearParticulas();
		this.setDepth(2);
		this.isArmed=true;
		this.overlapObject = this.scene.physics.add.overlap(this, this.scene.enemies,this.enemyDestroy);
		this.overlapObject = this.scene.physics.add.overlap(this, this.scene.mainEnemy,this.mainenemyDestroy);

	}

	crearParticulas() {
		
		this.particles = this.scene.add.particles('flares');
		
		this.particles.createEmitter({
			frame: "flare30000",
			scale: { start: 0.6, end: 0.2 },
			blendMode: 'ADD',
			lifespan: 30,
			//	emitZone: { type: 'edge', source: rose, quantity: 360 },
			follow: this
		});
	
		this.particles.depth=1;
	
	
	}

	mainenemyDestroy(bullet,enemy){
		if(bullet.isArmed){
			enemy.enemyDestroy(bullet,enemy);
			bullet.isArmed=false;
		}
	}

	enemyDestroy(bullet,enemy){
		if(bullet.isArmed){
			enemy.enemyDestroy(bullet,enemy);
			bullet.isArmed=false;
		}
		
	}

	destroyObjetc(){

		this.particles.destroy();
		this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);	
		this.destroy();

	}

	destroyObjectByCollide(bullet){
		bullet.particles.destroy();
		bullet.visible=false;
		
		
		//bullet.destroy();
	}

	update(){
		

		if(this.y>this.scene.cameras.main.height+100){
		this.destroyObjetc();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
