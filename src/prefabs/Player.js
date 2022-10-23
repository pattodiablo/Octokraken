
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "OktokrakenPlayer", frame ?? "idlePlayer instancia 10001");

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

create(){

	this.laser_shot = this.scene.sound.add('laser_shot');
	this.laser_shot.loop = false;


	this.scene.physics.world.enableBody(this);
	this.body.setCollideWorldBounds(true);
	this.body.setOffset(15, 5);
	this.body.setSize(60, 90, false);	
	

	this.isMouseDown = false;
	this.y=this.scene.cameras.main.height/3;
	this.x=this.scene.cameras.main.width/2;
	this.isFiring=false;
	this.playerLevel=1;
	this.missileSpacing=40;
	this.currentLevelFill = 0;
	this.canFire=true;
	this.isHurt=false;
	this.canPlay = true;

	this.scene.input.on('pointerdown', function (pointer) { 

		this.currentMouseY = this.scene.input.y;
		this.currentMouseX= this.scene.input.x;

		this.isFiring=true;
		if(this.canFire){
			this.fire();
		}
		
		this.isMouseDown=true;

	}, this);

	this.scene.input.on('pointerup', function (pointer) { 	
		this.stopFire()
		this.isFiring=false;
		this.isMouseDown=false;

	}, this);



		this.crearParticulas();
		this.defaultIdleAnim();

		this.laser_shot = this.scene.sound.add('laser_shot');
		this.laser_shot.loop = false;

		this.hurt = this.scene.sound.add('hurt');
		this.hurt.loop = false;

		this.travel = this.scene.sound.add('travel');
		this.travel.loop = true;

}

stopPlay(){

	this.body.enable=false;
	this.canFire=false;
	this.canPlay=false;
	this.desaparecer();
}


collideKrakenBullet(){
	console.log("is playerhurt")
	this.isHurt=true;

}


desaparecer(){

	var desaparecer = this.scene.tweens.createTimeline();
	desaparecer.add({
			targets: this,
			y: -100,
			duration: 500,
			ease: 'Linear',
			
			
			onComplete: function(){
				
			}

		});
		desaparecer.play();

}

hurtPlayer(){

	this.body.enable=false;
	this.playerLevel=1;
	this.tint=0xC70B24;
	this.canFire=false;
	this.isHurt=true;
	this.currentLevelFill = 0;

	var blinking = this.scene.tweens.createTimeline();
	blinking.add({
			targets: this,
			alpha: 0.7,
			duration: 50,
			ease: 'Linear',
			repeat: 20,
			yoyo: true,
			onComplete: function(){
				this.targets[0].tint=0xffffff;
				this.targets[0].body.enable=true;
				this.targets[0].canFire=true;
				this.targets[0].isHurt=false;
			}

		});
		blinking.play();
}


fire(){

	this.fireClock = this.scene.time.addEvent({
		delay: 150,                // ms
		callback: function(){
			
			switch(this.playerLevel){
				case 1:
					if(this.canFire){
						this.laser_shot.play();	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
					}
				
				break;

				case 2:

					if(this.canFire){
						this.laser_shot.play();	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
					}

				
				break;

				case 3:

					if(this.canFire){
						this.laser_shot.play();	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
					}


					
				break;

				case 4:

					if(this.canFire){
						this.laser_shot.play();	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing*2, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing*2, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
					}

					
				break;

				case 5:

					if(this.canFire){
						this.laser_shot.play();	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing*2, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);

						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing*2, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
					}

					
				break;

				default:

					if(this.canFire){
						this.laser_shot.play();	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x+this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
	
						this.berenjenaBullet = new BerenjenaBullet(this.scene, this.x-this.missileSpacing, this.y+60);
						this.scene.add.existing(this.berenjenaBullet);
					}

				


					break
			}

		},
		//args: [],
		callbackScope: this,
		loop: true
	});


}

stopFire(){
	if(this.fireClock!=="undefined"){
		this.fireClock.remove();

	}


}


defaultIdleAnim(){


	this.idleAnim = this.scene.tweens.createTimeline();
	this.idleAnim.add({
		targets: this,
		scale: 0.95	,
		duration: 500,
		yoyo:true,
		ease: 'Linear',
		repeat: -1

	});


	this.idleAnim.play();

}

crearParticulas() {
	var k = 3;
	var rose = {
		getPoints: function (quantity, stepRate) {
			if (!stepRate) {
				stepRate = Phaser.Math.PI2 / quantity;
			}

			var input = Phaser.Utils.Array.NumberArrayStep(0, Phaser.Math.PI2, stepRate);
			var output = new Array(input.length);

			for (var i = 0; i < input.length; i++) {
				var angle = input[i];
				output[i] = new Phaser.Math.Vector2().setToPolar(angle, 10 * Math.cos(k * angle));
			}

			return output;
		}
	};
	this.particles = this.scene.add.particles('flares');
	var tree = new Phaser.Geom.Triangle.BuildEquilateral(0, -10, 40);
	this.particles.createEmitter({
		frame: "flare20000",
		scale: { start: 1, end: 0.1 },
		blendMode: 'ADD',
		lifespan: 300,
		//	emitZone: { type: 'edge', source: rose, quantity: 360 },
		follow: this
	});
	var supaCurrentDepth = this.depth;

	this.setDepth(supaCurrentDepth+1);


}


checkAnimStatus(){

	if(this.isHurt){
		this.play("playerHurt", true);
	}else{
		if(this.isFiring){
			this.play("firePlayer", true);
		}else{
			this.play("idlePlayer", true);
		}
	}
	

}


update(){
	this.setTint(0xffffff);
	this.scene.lifeVisual2.width=this.currentLevelFill;
	this.checkAnimStatus();


	if(!this.isHurt){
			if(this.isMouseDown){
				if(this.canPlay){
					this.yDiff=this.currentMouseY-this.scene.input.y;
					this.xDiff=this.currentMouseX-this.scene.input.x;
					this.y-=this.yDiff/20;
					this.x-=this.xDiff/20;
				}
			

	}
	}
	
	

}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
