
// You can write more code here

/* START OF COMPILED CODE */

class Oktokraken extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "OktokrakenPlayer", frame ?? "kraken instancia 10000");

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){

		this.scene.physics.world.enableBody(this);
		this.x=this.scene.cameras.main.width/2;
		this.y=this.scene.cameras.main.height;
		this.animarNacimiento();
		this.isIdle = true;
		this.enemyLife=30;

		this.body.setOffset(110, 80);
		this.body.setSize(120, 170, false);	

		this.aparecer();

	}

	desaparecer(){
		this.moveTimer.destroy();
		
		var saliendoTimeline = this.scene.tweens.createTimeline();
		saliendoTimeline.add({
			targets: this,
			y: this.scene.cameras.main.height+230,
			duration: 5000,
			onComplete:function(){
				this.totalExplotion();
			},
			onCompleteScope:this,
			ease: 'Linear',
			repeat: 0

		});
		saliendoTimeline.play();
	}

	totalExplotion(){
		this.finalExplotionTimer = this.scene.time.addEvent({
			delay: 100,                // ms
			callback: function(){
				console.log("explotando")
				this.whereX = Phaser.Math.Between(100, 400);
				this.whereY = Phaser.Math.Between(50, 960);
				this.FinalExplotion = new FinalExplotion(this.scene, this.whereX , this.whereY);
				this.scene.add.existing(this.FinalExplotion);
			},
	
			//args: [],
			callbackScope: this,
			repeat: 40
		});
		

		this.finalExplotionTimer = this.scene.time.addEvent({
			delay: 3000,                // ms
			callback: function(){
				this.scene.ganaste();
			},
	
			//args: [],
			callbackScope: this,
			repeat: 40
		});
   
	}

	aparecer(){

		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			y: this.scene.cameras.main.height-130,
			duration: 1000,
			onComplete:function(){
				this.createKrakenEnergyBar();
				this.scene.mainEnemy.push(this);
				this.moverLateralmente();
			},
			onCompleteScope:this,
			ease: 'Linear',
			repeat: 0

		});



		entrandoTimeline.play();
	}

	moverLateralmente(){
		this.direcction=1;
		this.moveTimer = this.scene.time.addEvent({
			delay: 10,                // ms
			callback: function(){
				this.x+=2*this.direcction;

				if(this.x>400){
					this.direcction*=-1;

				}
				if(this.x<100){
					this.direcction*=-1;
				}

			},
			//args: [],
			callbackScope: this,
			loop: true
		});


	}

	animarNacimiento(){




		var entrandoTimeline = this.scene.tweens.createTimeline();
		entrandoTimeline.add({
			targets: this,
			scale: 0.9,
			duration: 1000,
			yoyo:true,
			ease: 'Linear',
			repeat: -1

		});
		entrandoTimeline.play();

	}

	createKrakenEnergyBar(){

		this.krakenVisual = this.scene.add.rectangle(70, 900, 400, 40, 0xEA1992,0.7);
		this.krakenVisual.setOrigin(0,0.5);

		this.krakenVisual2 = this.scene.add.rectangle(70, 900, 400, 40, 0xEA1992,0);
		this.krakenVisual2.setOrigin(0,0.5);
		this.krakenVisual2.setStrokeStyle(4, 0xffffff);
		this.krakenVisual2.depth=3



	}

	destroyObjetc(){

		this.isDestroyed=true;
		this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);


		this.destroy();

	}


	enemyDestroy(bullet,enemy){
		enemy.setTint("0xD93030");
	this.Tintimer = this.scene.time.addEvent({
			delay: 50,                // ms
			callback: function(){
				enemy.setTint("0xffffff");
			},
			//args: [],
			callbackScope: this,
			loop: false
		});
   
		
   

		//poner sonido
		
		bullet.destroyObjectByCollide(bullet);
		if(this.enemyLife>0){

			this.hitAnimation = new HitAnimation(this.scene, bullet.x, bullet.y);
			this.hitAnimation.explodeType =  Phaser.Math.Between(1, 3);

			this.scene.add.existing(this.hitAnimation);

		
			this.enemyLife--;

		}else{

			this.body.enable=false;
			this.desaparecer();
			this.finalExplotionTimer = this.scene.time.addEvent({
				delay: 300,                // ms
				callback: function(){
					console.log("explotando")
					this.whereX = Phaser.Math.Between(100, 400);
					this.whereY = Phaser.Math.Between(800, 960);
					this.FinalExplotion = new FinalExplotion(this.scene, this.whereX , this.whereY);
					this.scene.add.existing(this.FinalExplotion);
				},
				//args: [],
				callbackScope: this,
				repeat: 20
			});
	   

			
			




		}





	}


checkAnimStatus(){

	if(this.isIdle){
		this.play("idleKraken", true);
	}




}


update(){
this.checkAnimStatus();

}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here