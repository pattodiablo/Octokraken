
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
	}

	powerUpFill(powerUp,player){
	
		
		if(player.currentLevelFill<400){
			player.scene.powerText.text="QUITO POWER " + player.playerLevel;
	
			player.currentLevelFill+=powerUp.fillPower;
		}else{
			if(player.playerLevel<4){

				powerUp.shield_up.play();	
				player.playerLevel++;
				player.currentLevelFill=0;
			}else{

				player.scene.powerText.text="QUITO MAX POWER !!" ;
			}
			
		}
		
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
