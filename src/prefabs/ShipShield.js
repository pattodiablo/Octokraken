
// You can write more code here

/* START OF COMPILED CODE */

class ShipShield extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "ShieldImg", frame);

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	create(){
		this.setDepth(this.scene.player.depth+1);
		this.animarNacimiento();
		this.setScale(1.2);
		this.scene.ShipShield=this;
		this.shield_up = this.scene.sound.add('shield_up');
		this.shield_up.loop = false;
		this.shield_up.play();	

	}
	update(){

		if(this.active){
			this.x=this.scene.player.x;
			this.y=this.scene.player.y;

		}
	
	
	}

	animarNacimiento(){

		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			alpha: 0.5,
			duration: 100,
			yoyo:true,
			ease: 'Linear',
			repeat: -1
	
		});
		entrandoTimeline.play();
	
		var entrandoTimeline2 = this.scene.tweens.createTimeline();
		entrandoTimeline2.add({
			targets: this,
		
			scale: 1.3,
			duration: 500,
			yoyo:true,
			ease: 'Linear',
			repeat: -1
	
		});
		entrandoTimeline2.play();
	
	}

	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
