
// You can write more code here

/* START OF COMPILED CODE */

class BombBtn extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "BerenjeBombBtn", frame);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.nuke = this.scene.sound.add('nuke');
		this.nuke.loop = false;
		this.setInteractive().on('pointerup', this.deployBomb,this);
		this.isArmed = false;
		this.play("btn", true);
	}

	deployBomb(){


		if(this.isArmed){
			this.nuke.play();	
			console.log("will deploy bomb");
			this.scene.player.currentLevelFill=0;
			this.scene.berenjeBomba.visible=true;
			this.isArmed=false;
			this.scene.player.retirar();
			this.animateDrop = this.scene.tweens.createTimeline();
			this.animateDrop.add({
				targets: this.scene.berenjeBomba,
				alpha: 0,
				angle: 360,
				scale: 0.1,
				duration: 3000,
				ease: 'Linear',
				repeat: 0,
				callbackScope: this,
				onComplete: function () {
				console.log("complete animation");
				this.scene.cameras.main.shake(1000,0.05);
				this.scene.nukeBomb.explode();
	
				}
	
			});
	
			this.animateDrop.play();
		}
	
	}

	update(){
		if(this.isArmed){

			var entrandoTimeline = this.scene.tweens.createTimeline();
			entrandoTimeline.add({
				targets: this,
				x: 530,
				duration: 500,
				ease: 'Linear',
				repeat: 0

			});
			entrandoTimeline.play();
		}else{
			var saliendoTimeline = this.scene.tweens.createTimeline();
			saliendoTimeline.add({
				targets: this,
				x: 790,
				duration: 500,
				ease: 'Linear',
				repeat: 0

			});
			saliendoTimeline.play();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
