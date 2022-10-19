
// You can write more code here

/* START OF COMPILED CODE */

class Enemy1 extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "enemy1", frame);

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.name=this.texture.key;
		this.scene.physics.world.enableBody(this);
		this.scene.enemies.push(this);
		this.body.velocity.y=-80;
		this.scene.physics.add.overlap(this.scene.player, this,this.playerCollide);
		this.enemyLife=3;
		
		this.animarNacimiento();

		this.vel = Phaser.Math.Between(80,200);
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;

		this.enemy_destroy2 = this.scene.sound.add('enemy_destroy2');
		this.enemy_destroy2.loop = false;

		this.hurt = this.scene.sound.add('hurt');
		this.hurt.loop = false;
	}

	update(){
	
	
	
	
	 if(this.y<-100){
		this.destroy();
	 }
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
			scale: 0.9,
			duration: 200,
			yoyo:true,
			ease: 'Linear',
			repeat: -1

		});
		entrandoTimeline.play();

	}


	enemyDestroy(bullet,enemy){
		//poner sonido
		
		bullet.destroyObjectByCollide(bullet);
		if(this.enemyLife>0){
	
			this.hitAnimation = new HitAnimation(this.scene, bullet.x, bullet.y);
			this.hitAnimation.explodeType =  Phaser.Math.Between(1, 3);
			console.log(this.hitAnimation.explodeType);
			this.scene.add.existing(this.hitAnimation);
			
			enemy.hurt.play();	
			this.enemyLife--;

		}else{
		
			enemy.play("explosion1",true);
			enemy.enemy_destroy.play();	
			enemy.body.enable=false;
		
			this.probabilidadDeEnergia = Phaser.Math.Between(0, 100);
			if(this.probabilidadDeEnergia>50){
				const powerUp = new PowerUp(this.scene, this.x, this.y);
				this.scene.add.existing(powerUp);
			}
		
		
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
		

		
		
		
	}

	playerCollide(player,enemy){
		player.blink();
		enemy.enemy_destroy2.play();	
		
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
