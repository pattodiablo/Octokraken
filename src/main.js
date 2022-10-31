
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
		type: Phaser.AUTO,
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
		console.log(gameCanvas.getContext('webgl'));
		const dataUrl = gameCanvas.toDataURL("image/png");
	
	
		const blob = await fetch(dataUrl).blob();
		
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