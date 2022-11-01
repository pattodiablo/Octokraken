
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
		
		this.enemyLife=2;
		this.isDestroyed = false;
		this.enemyValue = 80;
		
		this.animarNacimiento();

		this.vel = Phaser.Math.Between(80,200);
		this.enemy_destroy = this.scene.sound.add('enemy_destroy');
		this.enemy_destroy.loop = false;

		this.enemy_destroy2 = this.scene.sound.add('enemy_destroy2');
		this.enemy_destroy2.loop = false;

		this.hurt = this.scene.sound.add('hurt');
		this.hurt.loop = false;
	}


	destroyByDeadPlayer(){

		this.enemyLife=0;
		this.play("explosion1",true);
		this.enemy_destroy.play();	
		this.body.enable=false;



		var destroyTimer = this.scene.time.addEvent({
			delay: 500,                // ms
			callback: function(){

				this.destroyObjetc(true);
			},
			//args: [],
			callbackScope: this,
			loop: false
		});
	
	}

	destroyByNuke(){

		this.enemyLife=0;
		this.play("explosion1",true);
		this.enemy_destroy.play();	
		this.body.enable=false;



		var destroyTimer = this.scene.time.addEvent({
			delay: 500,                // ms
			callback: function(){

				this.destroyObjetc();
			},
			//args: [],
			callbackScope: this,
			loop: false
		});
	
	}


	collideWithShield(shield, enemy){
	
		enemy.enemyLife=0;
		enemy.play("explosion1",true);
		enemy.enemy_destroy.play();	
		enemy.body.enable=false;

		shield.expand();

		var destroyTimer = enemy.scene.time.addEvent({
			delay: 500,                // ms
			callback: function(){

				enemy.destroyObjetc();
			},
			//args: [],
			callbackScope: this,
			loop: false
		});
	
	}


	destroyObjetc(noSumar){


		try {
			
	if(!noSumar){
		if(this.scene!== "undefined"){
			this.scene.score +=this.enemyValue;

		}
	}

			
		
		this.isDestroyed=true;
		if(this.scene!== "undefined"){

		
				this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
		
			  
		
	
		}
		

		const index = this.scene.enemies.indexOf(this);
		if (index > -1) { // only splice array when item is found
			this.scene.enemies.splice(index, 1); // 2nd parameter means remove one item only
		}

		// array = [2, 9]
	
	
		this.destroy();
		  } catch (error) {
	
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		  }
		  


	}

	update(){


		if(!this.isDestroyed){
			if(this.y<-100){
		
			this.destroyObjetc();
			
			}
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
		
			this.scene.add.existing(this.hitAnimation);
			
			enemy.hurt.play();	
			this.enemyLife--;

		}else{
		
			this.randomEffect = Phaser.Math.Between(1,2);
			if(this.randomEffect>1){
				enemy.play("bigExplode",true);
			}else{
				enemy.play("explosion1",true);
			}
		
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

					enemy.destroyObjetc();
				},
				//args: [],
				callbackScope: this,
				loop: false
			});
		}
		

		
		
		
	}

	playerCollide(player,enemy){
		player.hurtPlayer();
		enemy.enemy_destroy2.play();	
		//enemy.collideWithShield(enemy.scene.shipShield,enemy);
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
