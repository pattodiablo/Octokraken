
// You can write more code here

/* START OF COMPILED CODE */

class Enemy3 extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "enemy3", frame);

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.name=this.texture.key;
		this.scene.physics.world.enableBody(this);
		this.scene.physics.add.overlap(this.scene.player, this,this.playerCollide);
		this.scene.physics.add.overlap(this.scene.playerBullets, this,this.enemyDestroy);
		this.setScale(1)
		this.animarNacimiento()
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;
	}

	animarNacimiento(){

		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			scale: 1,
			duration: 100,
			ease: 'Linear',
			repeat: 0

		});
		entrandoTimeline.play();

		
		var pulsa = this.scene.tweens.createTimeline();
		pulsa.add({
			targets: this,
			scale: 1.1,
			duration: 500,
			ease: 'Linear',
			loop: true,
			repeat:-1,
			yoyo:true

		});
		pulsa.play();

		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			angle: 360,
			duration: 3000,
		
			ease: 'Linear',
			repeat: -1

		});
		entrandoTimeline.play();

	}
	
	enemyDestroy(bullet,enemy){
		//poner sonido
		enemy.play("explosion1",true);
		enemy.enemy_destroy.play();	
		enemy.body.enable=false;
		enemy.scene.player.handleScore(enemy);
		enemy.scene.EnemiesDestroyed++;
	
		bullet.particles.destroy();
		bullet.destroy();
		var destroyTimer = enemy.scene.time.addEvent({
			delay: 500,                // ms
			callback: function(){

				enemy.destroy();
			},
			//args: [],
			callbackScope: this,
			loop: false
		});

		
		
		
	}

	playerCollide(player,enemy){
		enemy.play("explosion1",true);
		enemy.enemy_destroy.play();	
		enemy.scene.EnemiesDestroyed++;
		enemy.body.enable=false;
		//console.log(enemy.scene.EnemiesDestroyed);
		var destroyTimer = enemy.scene.time.addEvent({
		delay: 500,                // ms
		callback: function(){

			enemy.destroy();
		},
		//args: [],
		callbackScope: this,
		loop: false
	});

		player.handleEnemyCollition();
		player.handleScore(enemy);
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
