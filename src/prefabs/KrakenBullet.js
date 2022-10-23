
// You can write more code here

/* START OF COMPILED CODE */

class KrakenBullet extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "krakenBullet", frame);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	create(){
		this.scene.physics.world.enableBody(this);
		this.overlapObject = this.scene.physics.add.overlap(this, this.scene.player,this.collidePlayer);
		this.isBulletactive =  true;
		this.body.velocity.y=-400;
		this.setDepth(0)

		this.animarNacimiento();

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

	collidePlayer(bullet,player){
		if(bullet.isBulletactive){
			player.hurtPlayer();
			this.FinalExplotion = new FinalExplotion(player.scene, player.x ,  player.y);
			player.scene.add.existing(this.FinalExplotion);
			bullet.isBulletactive=false;
		}

	}


	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
