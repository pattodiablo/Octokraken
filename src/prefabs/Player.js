
// You can write more code here

/* START OF COMPILED CODE */

class Player extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "player", frame);

		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

create(){
	this.scene.physics.world.enableBody(this);
	this.body.setCollideWorldBounds(true);
	this.isPressingSpacebar = false;
	this.hasShot=false;
	this.body.drag=300;
	this.life=3;
	this.score=0;
	this.body.physicsType=0;
	this.body.setDamping(true);
    this.body.drag=0.99;
    this.body.setMaxVelocity(400);
	this.defaultDamping = 0;
	this.gotShield=false;
	this.shieldPower=3;
	this.isShieldActive=false;

	console.log(this.body);

	this.cursors = this.scene.input.keyboard.addKeys(
		{
		up:Phaser.Input.Keyboard.KeyCodes.W,
		down:Phaser.Input.Keyboard.KeyCodes.S,
		left:Phaser.Input.Keyboard.KeyCodes.A,
		right:Phaser.Input.Keyboard.KeyCodes.D,
		space:Phaser.Input.Keyboard.KeyCodes.SPACE
		
		});


		this.crearParticulas();

		this.laser_shot = this.scene.sound.add('laser_shot');
		this.laser_shot.loop = false;

		this.hurt = this.scene.sound.add('hurt');
		this.hurt.loop = false;

		this.travel = this.scene.sound.add('travel');
		this.travel.loop = true;

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
		scale: { start: 0.4, end: 0.1 },
		blendMode: 'ADD',
		lifespan: 300,
		//	emitZone: { type: 'edge', source: rose, quantity: 360 },
		follow: this
	});
	var supaCurrentDepth = this.depth;

	this.setDepth(supaCurrentDepth+1);


}

shoot(){
console.log("trying shoot")

}

handleScore(enemy){

	switch (enemy.name) {
		case "enemy1":
			this.score+=10;
			break;
	
			case "enemy2":
				this.score+=20;
				break;
	
				
			case "enemy3":
			this.score+=30;
			break;
			
			case "enemy4":
				this.score+=40;
				break;
			
			case "enemy5":
				this.score+=50;
					break;
			
			case "boss":
					this.score+=100;
				break;
							
		default:
			break;
	}
}

handleEnemyCollition(){
	this.hurt.play();	
	this.scene.cameras.main.shake(60);
	this.scene.cameras.main.flash(200, 172, 29, 41);
	if(this.isShieldActive){
		this.shieldPower--;
		console.log(this.shieldPower)
		if(this.shieldPower<=0){
			this.isShieldActive=false;
			console.log(this.scene.ShipShield)
			this.scene.ShipShield.destroy();
		}

	}else{

		this.life--;
		switch (this.life) {
			case 2:
				this.scene.heart3.visible=false
				break;
			case 1:
					this.scene.heart2.visible=false
					break;
			case 0:
					this.scene.heart1.visible=false
				this.morirAnimation();
					break;
		
			default:
				break;
		}
	}
	
}

morirAnimation(){

	this.body.enable=false;
	var entrandoTimeline = this.scene.tweens.createTimeline();
	entrandoTimeline.add({
		targets: this,
		scale: 1.5,
		duration: 100,
	
		ease: 'Linear',

	});
	entrandoTimeline.add({
		targets: this,
		scale: 0.1,
		duration: 100,
		ease: 'Linear'

	});
	entrandoTimeline.add({
		targets: this,
		scale: 1,
		duration: 100,
		ease: 'Linear',
		onComplete: function(){

			this.play("hit1",true);
			this.particles.destroy();
		},
		callbackScope:this,
	});

	entrandoTimeline.add({
		targets: this,
		scale: 3,
		alpha: 0.5,
		duration: 100,
		ease: 'Linear',
		repeat: 3,
		yoyo:true,
		onComplete: function(){

			this.scene.cameras.main.fadeOut(2000);
			this.scene.cameras.main.once('camerafadeoutcomplete', function () {	

				this.scene.scene.start('GameOver');
				
					}, this);
		},
		callbackScope:this

	});
	entrandoTimeline.play();

}

update(){



	this.defaultDamping++;
	if(this.defaultDamping>=1.1){
		this.defaultDamping=1.1;
	
	}

	this.body.velocity.x=this.body.velocity.x/this.defaultDamping;
	this.body.velocity.y=this.body.velocity.y/this.defaultDamping;

this.body.setFriction(10,10);

	if (this.cursors.space.isDown)
    {
		
		if(!this.hasShot){
			this.laser_shot.play();	
			const playerBullet = new PlayerBullet(this.scene, this.x,this.y);
			this.scene.playerBullets.push(playerBullet);
			this.scene.add.existing(playerBullet);
		}
	
		this.hasShot=true
	
	
    }

	if (this.cursors.space.isUp)
    {

		this.hasShot=false;
		
	
    }
	
	if (this.cursors.left.isDown)
    {
		this.body.rotation-=3;
	
    }
    else if (this.cursors.right.isDown)
    {
		this.body.rotation+=3;
    }

    if (this.cursors.up.isDown)
    {
		this.defaultDamping=1;
		this.scene.physics.velocityFromRotation(this.rotation, 350, this.body.velocity);
    }


	if(this.gotShield && !this.isShieldActive){
		console.log("aparecer escudo")
		const shieldImg = new ShipShield(this.scene, this.x, this.y);
		this.scene.add.existing(shieldImg);
		this.isShieldActive=true;
		this.gotShield=false;
	}
	
    
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
