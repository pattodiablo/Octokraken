
// You can write more code here

/* START OF COMPILED CODE */

class Enemy4 extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "enemy4", frame);

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
		//this.setScale(0.1)
		//this.animarNacimiento()

		//this.body.velocity.x = Phaser.Math.Between(50,100);
		this.initY=this.y;
		
		this.setScale(0.1)
		this.animarNacimiento()

		
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;
		
	}

	update(){
		if(this.active){
		//this.angle+=180/3000; 
		//this.scene.physics.velocityFromAngle(-90+this.angle, this.vel , this.body.velocity);
	this.body.velocity.x=50;
	this.angle+=2;
	this.body.y = this.initY + 200*Math.sin(this.angle*Math.PI/180);
	if(this.x>3000){
		this.x = 0;
	}
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
			y: this.y+20,
			duration: 500,
			yoyo:true,
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