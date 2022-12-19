
window.addEventListener('load', function () {

	let currentWidth =  document.body.clientWidth;
	let currentHeight = document.body.clientHeight;





	if(currentWidth>1080){
		console.log("ajusto tamanos")
		currentWidth=1080;
		currentHeight=1920;
	}
	console.log("currentWidth " + currentWidth);

	console.log("currentHeight " + currentHeight);

	var game = new Phaser.Game({
		width: 540,
		height:  960,
		type: Phaser.CANVAS,
		scale: {
			mode: Phaser.Scale.ENVELOP,
		
		},
        backgroundColor: "#242424",
		physics: {
			default: "arcade",
			arcade: {
				fps: 60,
				gravity: { y: 0 },
				debug: false				
			}			
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);

	game.shareEvent = async function(){
	
		
		const gameCanvas = game.canvas;
		gameCanvas.preserveDrawingBuffer=true;
		console.log(gameCanvas);
		const dataUrl = gameCanvas.toDataURL();
	
	
		const blob = await (await fetch(dataUrl)).blob();
		console.log(blob)
		const filesArray = [
		  new File(
			[blob],
			'alarcon.png',
			{
			  type: blob.type,
			  lastModified: new Date().getTime()
			}
		  )
		];
		const shareData = {
			files: filesArray,
			text: 'Llegó la hora de juntos impedir que los mismos politiqueros de siempre se tomen la ciudad para sus chanchullos. Vamos por un Quito con FUTURO. Juega y salva la ciudad ahora!',  // Text to be shared
			url: 'https://patricio-alarcon.com/'   // URL to be shared
		  };
		try {
		await navigator.share(shareData);
		
		} catch (err) {
			console.log(err)
		}
	}

});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}