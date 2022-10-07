
// You can write more code here

/* START OF COMPILED CODE */

class Shield extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "playerAnimations", frame ?? "hit20004");

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
	

	this.animarNacimiento();
	this.lifeTimer = this.scene.time.addEvent({
		delay: 8000,                // ms
		callback: function(){

			this.play("hit2",true);

			var destroyTimer = this.scene.time.addEvent({
				delay: 500,                // ms
				callback: function(){
	
					this.destroy();
				},
				//args: [],
				callbackScope: this,
				loop: false
			});

			
		},
		//args: [],
		callbackScope: this,
		loop: false
	});


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
		alpha: 0.5,
		scale: 1.2,
		duration: 500,
		yoyo:true,
		ease: 'Linear',
		repeat: -1

	});
	entrandoTimeline.play();

}

	update(){

	}

	playerCollide(player,Shield){
		Shield.lifeTimer.destroy();
		Shield.play("hit2",true);
		Shield.body.enable=false;
		player.gotShield=true;
		player.shieldPower=3;
		var destroyTimer = Shield.scene.time.addEvent({
			delay: 500,                // ms
			callback: function(){

				Shield.destroy();
			},
			//args: [],
			callbackScope: this,
			loop: false
		});
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
