
// You can write more code here

/* START OF COMPILED CODE */

class PowerUp extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "powerUp", frame);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
	
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.scene.physics.world.enableBody(this);
		this.body.velocity.y=-Phaser.Math.Between(150, 250);
		this.fillPower = 50
		this.animarNacimiento();
		this.scene.physics.add.overlap(this, this.scene.player,this.powerUpFill);
		this.shield_up = this.scene.sound.add('shield_up');
		this.shield_up.loop = false;
		this.isDestroyed = false;
		this.PowerUpValue = 10;

		this.pwrup01 = this.scene.sound.add('pwrup01');
		this.pwrup01.loop = false;
		this.pwrup02 = this.scene.sound.add('pwrup02');
		this.pwrup02.loop = false;
		
	}

	powerUpFill(powerUp,player){
	
		player.scene.score +=powerUp.PowerUpValue;
		player.currentLevelFill+=powerUp.fillPower;

		if(player.currentLevelFill<player.maxLevelFill){
			player.scene.powerText.text="QUITO PONTE ON " + player.playerLevel;
	
		
		
		}else{
			player.scene.bombBtn.isArmed=true;
			if(player.playerLevel<=3){

				powerUp.shield_up.play();	
				player.playerLevel++;
				player.currentLevelFill=0;
			}else{
				player.playerLevel=4;
				player.currentLevelFill=player.maxLevelFill;
				player.scene.powerText.text="QUITO PONTE ON!!" ;
			}
			
		}

		this.ranSound = Phaser.Math.Between(1, 2);
		if (this.ranSound > 1) {
			powerUp.pwrup01.play();
		} else {
			powerUp.pwrup02.play();
        }
		

		


		console.log("suena");
		powerUp.destroy();
		
		
		
	}

	animarNacimiento(){

		

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


	destroyObjetc(){

		this.isDestroyed=true;
		this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
		this.destroy();
		
		
		

	}

	update(){
		this.rotation+=0.1;

		if(!this.isDestroyed){
			if(this.y<-30){
			
			this.destroyObjetc();
			}
		}
		
		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
