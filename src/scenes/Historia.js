
// You can write more code here

/* START OF COMPILED CODE */

class Historia extends Phaser.Scene {

	constructor() {
		super("Historia");

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// historyBg1
		const historyBg1 = this.add.image(0, 0, "historyBg1");
		historyBg1.setOrigin(0, 0);

		// oktokraken_1
		const oktokraken_1 = this.add.image(159, 789, "Oktokraken_1");

		// explotion
		const explotion = this.add.image(402, 776, "Explotion");

		// historyBg3
		const historyBg3 = this.add.image(0, 0, "historyBg3");
		historyBg3.setOrigin(0, 0);

		// patoOnJet
		const patoOnJet = this.add.image(762, 576, "PatoOnJet");

		// textoHistoria
		this.add.image(257, 215, "textoHistoria");

		// jugarBtn
		const jugarBtn = this.add.image(288, 813, "jugarBtn");

		this.historyBg1 = historyBg1;
		this.oktokraken_1 = oktokraken_1;
		this.explotion = explotion;
		this.historyBg3 = historyBg3;
		this.patoOnJet = patoOnJet;
		this.jugarBtn = jugarBtn;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	historyBg1;
	/** @type {Phaser.GameObjects.Image} */
	oktokraken_1;
	/** @type {Phaser.GameObjects.Image} */
	explotion;
	/** @type {Phaser.GameObjects.Image} */
	historyBg3;
	/** @type {Phaser.GameObjects.Image} */
	patoOnJet;
	/** @type {Phaser.GameObjects.Image} */
	jugarBtn;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.scene.scene.cameras.main.fadeIn(2000);
		this.editorCreate();

			this.oktokraken_1.visible=false;
			this.oktokraken_1.y=1400;
			this.jugarBtn.visible=false;
			this.jugarBtn.setInteractive().on('pointerup', this.iniciarJuego,this);
			this.animar();

	}

	iniciarJuego(){
	
		this.scene.start('Level');
	}


	animar(){

		this.oktokraken_1.visible=true;
		this.breathing = this.tweens.createTimeline();
		this.breathing.add({
			targets: this.oktokraken_1,
			scale: 1.05,
			duration: 1000,
			ease: 'Linear',
			repeat: -1,
			yoyo:true

		});
		this.breathing.play();

		this.appearing = this.tweens.createTimeline();
		this.appearing.add({
			targets: this.oktokraken_1,
			y: 790,
			duration: 4000,
			ease: 'Linear',
			repeat: 0,
			onComplete: function(){




				this.appearingFromside2 = this.tweens.createTimeline();
				this.appearingFromside2.add({
					targets: this.oktokraken_1,
					x: 250,
					duration: 4000,
					ease: 'Linear',
					repeat: 0,
					onComplete: function(){




					},
					onCompleteScope: this


				});
				this.appearingFromside2.play();


				this.appearingFromside = this.tweens.createTimeline();
				this.appearingFromside.add({
					targets: this.patoOnJet,
					x: 460,
					duration: 4000,
					ease: 'Linear',
					repeat: 0,
					onComplete: function(){

						this.jugarBtn.visible=true;

						this.flyPato = this.tweens.createTimeline();
						this.flyPato.add({
						targets: this.patoOnJet,
						y: 594,
						duration: 2000,
						ease: 'Linear',
						yoyo:true,
						repeat: -1,
						onComplete: function(){


						
						},
						onCompleteScope: this


					});
					this.flyPato.play();



					},
					onCompleteScope: this


				});
				this.appearingFromside.play();



			},
			onCompleteScope: this


		});
		this.appearing.play();

		this.exploting = this.tweens.createTimeline();
		this.exploting.add({
			targets: this.explotion,
			alpha: 0.5,
			duration: 100,
			ease: 'Linear',
			yoyo:true,
			repeat: -1,


		});
		this.exploting.play();

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
