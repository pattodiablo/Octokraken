
// You can write more code here

/* START OF COMPILED CODE */

class Boss extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "boss", frame);

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.name=this.texture.key;
		this.scene.physics.world.enableBody(this);

		this.scene.physics.add.overlap(this.scene.player, this,this.playerCollide);
		this.scene.physics.add.overlap(this.scene.playerBullets, this,this.enemyDestroy);
		
		this.animarNacimiento()

		this.vel = Phaser.Math.Between(90,200);
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;
		this.life = 50;

		
	}

	update(){
		if(this.active){
		
			this.scene.physics.velocityFromAngle((180/Math.PI)*Phaser.Math.Angle.Between(this.x,this.y,this.scene.player.x,this.scene.player.y), this.vel , this.body.velocity);
		}
		
	
	
	//console.log(this.angle);
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

		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			scale: 1.2,
			duration: 1000,
			yoyo:true,
			ease: 'Linear',
			repeat: -1

		});
		entrandoTimeline.play();

	}

	
	enemyDestroy(bullet,enemy){
		//poner sonido
		enemy.life--;
	    console.log("enemy life " + enemy.life);
		

		// enemy.scene.player.handleScore(enemy);
	
		 bullet.particles.destroy();
		 bullet.destroy();
		 if(enemy.life<=0){
			 enemy.life = 0;
		enemy.play("explosion1",true);
		enemy.enemy_destroy.play();	
		enemy.body.enable=false;
	
			var destroyTimer = enemy.scene.time.addEvent({
				delay: 500,                // ms
				callback: function(){
			enemy.scene.waveLauncher();
			enemy.destroy();
			
				},
				//args: [],
				callbackScope: this,
				loop: false
			})

		
			 console.log('boss murio');
		 }
	
	
	
	}

	playerCollide(player,enemy){
		enemy.play("explosion1",true);
		enemy.enemy_destroy.play();	

		player.handleEnemyCollition();
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here