
// You can write more code here

/* START OF COMPILED CODE */

class MensajeRandom extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "mensaje1", frame);

		/* START-USER-CTR-CODE */
	
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	/*create() {
		this.dm_alert1 = this.sound.add('dm_alert1');
		this.dm_alert1.loop = false;
		this.dm_alert1.play();
		
    }*/

	generarMensaje(){

		
		
		this.cualMensaje = Phaser.Math.Between(1,6);
		console.log("mensaje generado " +  this.cualMensaje)
		switch(this.cualMensaje ){
			case 1:
				this.setTexture("mensaje1");
				//this.dm_alert1.play();
			break;

			case 2:
				this.setTexture("mensaje2");
				//this.dm_alert1.play();
			break;

			case 3:
				this.setTexture("mensaje3");
				//this.dm_alert1.play();
			break;

			case 4:
				this.setTexture("mensaje4");
				//this.dm_alert1.play();
			break;

			case 5:
				this.setTexture("mensaje5");
				//this.dm_alert1.play();
			break;

			case 6:
				this.setTexture("mensaje6");
				//this.dm_alert1.play();
			break;


		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
