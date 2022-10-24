
// You can write more code here

/* START OF COMPILED CODE */

class BrazoPulpo extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "brazoPulpo", frame);

		/* START-USER-CTR-CODE */
		this.updateEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	create(){

		this.visible=false;
		this.scene.physics.world.enableBody(this);
		this.body.enable=false;
		this.alertStripe = this.scene.add.sprite(this.x, this.scene.cameras.main.height, "alertStripe");
		this.scene.physics.add.overlap(this.scene.player, this,this.playerCollide);
		this.alertStripe.setOrigin(0.5,1);
		this.alertStripe.setScale(0,0);
		this.setOrigin(0.5,0)
		this.showAlert();
	}

	playerCollide(player){
		this.body.enable=false;
		player.hurtPlayer();
	
		
	}

	showAlert(){

		
		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this.alertStripe,
			scale: 1,
			duration: 200,
			ease: 'Linear',
			repeat: 0

		});

		entrandoTimeline.add({
			targets: this.alertStripe,
			alpha: 0.5,
			duration: 100,
			ease: 'Linear',
			yoyo:true,
			repeat: 10

		});

		entrandoTimeline.add({
			targets: this.alertStripe,
			scale: 0,
			duration: 300,
			ease: 'Linear',
			onComplete:function(){

				this.showArm();
			},
			onCompleteScope:this,
			repeat: 0

		});
		entrandoTimeline.play();
	}

	showArm(){

		this.visible=true;
		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			y: 40,
			duration: 100,
			ease: 'BounceIn',
			onComplete:function(){

				this.body.enable=true;
			},
			onCompleteScope:this,
			repeat: 0

		});
		entrandoTimeline.add({
			targets: this,
			y: 60,
			duration: 300,
			ease: 'BounceIn',
			
			yoyo:true,
		
			repeat: 3

		});
		entrandoTimeline.add({
			targets: this,
			y: this.scene.cameras.main.height,
			duration: 300,
			ease: 'BounceIn',
			repeat: 0,
			onComplete:function(){

				this.scene.canAttackPulpo=true;
				this.body.enable=false;
			},
			onCompleteScope:this,

		});
		entrandoTimeline.play();

		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
