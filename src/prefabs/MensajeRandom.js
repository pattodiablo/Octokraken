
// You can write more code here

/* START OF COMPILED CODE */

class MensajeRandom extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "mensaje1", frame);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once("update", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create() {
		this.dm_alert1 = this.scene.sound.add('dm_alert1');
		this.dm_alert1.loop = false;
				
    }

	generarMensaje(){

		this.dm_alert1.play();
		
		this.cualMensaje = Phaser.Math.Between(1,6);

		switch(this.cualMensaje ){
			case 1:
				this.setTexture("mensaje1");
				
			break;

			case 2:
				this.setTexture("mensaje2");
				
			break;

			case 3:
				this.setTexture("mensaje3");
				
			break;

			case 4:
				this.setTexture("mensaje4");
				
			break;

			case 5:
				this.setTexture("mensaje5");
				
			break;

			case 6:
				this.setTexture("mensaje6");
				
			break;


		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
